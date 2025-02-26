import { MessageInterface } from '../features';
import { supabase } from '../libs/supabase';

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
  getMessages: async (chatId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chatroom_id', chatId)
      .order('timestamp', { ascending: true });

    if (error) throw error;

    return data;
  },
  sendMessage: async (chatId: string, userId: string, username: string, content: string) => {
    const newMessage = {
      chatroom_id: chatId,
      sender_id: userId,
      sender_name: username,
      files: [],
      content,
      timestamp: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('messages').insert([newMessage]).single();
    if (error) throw error;
    return data;
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
