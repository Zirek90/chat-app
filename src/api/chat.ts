import { fetchMessagesFromDb, insertMessageToDb, updateMessageInDb } from '../db';
import { MessageInterface } from '../features';
import { supabase } from '../libs/supabase';
import { getCachedFile } from '../utils';

export const ChatAPI = {
  getUserChatrooms: async (userId: string) => {
    const { data, error } = await supabase
      .from('chatrooms')
      .select(
        `
      id, 
      participants, 
      messages (
        content, sender_name, timestamp
      )
    `,
      )
      .contains('participants', [userId])
      .order('timestamp', { referencedTable: 'messages', ascending: false })
      .limit(1, { referencedTable: 'messages' }); // Get only the latest message

    if (error) throw error;

    return data;
  },
  getOrCreateChatroom: async (currentUserId: string, userId: string) => {
    const ids = [currentUserId, userId];

    const { data: existingRooms, error } = await supabase
      .from('chatrooms')
      .select('id, participants')
      .contains('participants', ids);

    if (error) throw error;

    const exactMatch = existingRooms?.find((room) => room.participants?.length === 2);

    if (exactMatch) {
      return exactMatch.id;
    }

    const { data: newRoom, error: createError } = await supabase
      .from('chatrooms')
      .insert([{ participants: ids }])
      .select('id')
      .single();

    if (createError) throw createError;

    return newRoom.id;
  },
  getChatParticipants: async (chatId: string) => {
    const { data, error } = await supabase
      .from('chatrooms')
      .select('participants')
      .eq('id', chatId)
      .single();

    if (error) throw error;

    return data?.participants;
  },
  getMessages: async (chatId: string, pageParam = 0, pageSize = 20) => {
    const cachedMessages = await fetchMessagesFromDb(chatId);
    if (cachedMessages.length > 0) {
      return cachedMessages;
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chatroom_id', chatId)
      .order('timestamp', { ascending: true }) // Get newest messages first
      .range(pageParam, pageParam + pageSize - 1); // Fetch 20 messages at a time

    if (error) throw error;

    // TODO figure out how to avoid unknown
    const messagesWithUrls = await Promise.all(
      (data as unknown as MessageInterface[]).map(async (message) => {
        if (!message.files) return message;

        const filesWithUrls = await Promise.all(
          message.files.map(async (file) => {
            const localPath = await getCachedFile(
              file.path,
              file.type === 'image' ? 'chat-images' : 'chat-files',
            );
            return { ...file, url: localPath }; // Use cached file
          }),
        );

        const updatedMessage = { ...message, files: filesWithUrls };

        await insertMessageToDb(updatedMessage);

        return updatedMessage;
      }),
    );

    return messagesWithUrls;
  },
  sendMessage: async (
    chatId: string,
    userId: string,
    username: string,
    content: string,
    attachments: { type: string; path: string }[],
  ) => {
    const newMessage = {
      chatroom_id: chatId,
      sender_id: userId,
      sender_name: username,
      files: attachments,
      edited: false,
      content,
      timestamp: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('messages').insert([newMessage]).select().single();
    if (error) throw error;
    await insertMessageToDb({ ...newMessage, id: data.id } as MessageInterface);

    return data;
  },
  editMessage: async (messageId: string, content: string) => {
    const { data, error } = await supabase
      .from('messages')
      .update({ content, edited: true })
      .eq('id', messageId)
      .select()
      .single();

    if (error) throw error;

    await updateMessageInDb(messageId, content, true);
    return data as unknown as MessageInterface;
  },
  subscribeToMessages: (chatId: string, callback: (message: MessageInterface) => void) => {
    const channel = supabase
      .channel(`messages-${chatId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMessage = payload.new as MessageInterface;
          if (newMessage.chatroom_id === chatId) {
            callback(newMessage);
          }
        },
      )
      .subscribe();

    return channel;
  },
};
