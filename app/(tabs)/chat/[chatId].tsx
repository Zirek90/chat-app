import { useEffect, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { API } from '@/src/api/api';
import {
  useAddFileAccessMutation,
  useSendMessageMutation,
  useEditMessageMutation,
  useProcessAttachmentsMutation,
} from '@/src/api/mutations';
import { useChatParticipantsQuery, useMessagesQuery, useUserQuery } from '@/src/api/queries';
import { Chat } from '@/src/features';
import { supabase } from '@/src/libs/supabase';
import { useThemeStore } from '@/src/store';
import { useChatStore } from '@/src/store/useChatStore';
import { FileType, ImageType } from '@/src/types';
import { getBackgroundImage } from '@/src/utils';

export default function ChatRoom() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const chatRoomId = Array.isArray(chatId) ? chatId[0] : chatId;
  const { theme } = useThemeStore();

  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const setMessages = useChatStore((state) => state.setMessages);
  const updateMessage = useChatStore((state) => state.updateMessage);
  const editingMessage = useChatStore((state) => state.editingMessage);
  const setEditingMessage = useChatStore((state) => state.setEditingMessage);

  const { data: user } = useUserQuery();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMessagesQuery(chatRoomId);
  const { data: participants } = useChatParticipantsQuery(chatRoomId);
  const { mutateAsync: addFileAccess } = useAddFileAccessMutation();
  const { mutateAsync: sendMessage } = useSendMessageMutation();
  const { mutateAsync: editMessage } = useEditMessageMutation();
  const { mutateAsync: processAttachments } = useProcessAttachmentsMutation();

  const chatMessages = useMemo(() => data?.pages.flat() || [], [data]); // Flatten paginated data

  useEffect(() => {
    if (chatMessages) setMessages(chatMessages);
  }, [chatMessages, setMessages]);

  useEffect(() => {
    const channel = API.chat.subscribeToMessages(chatRoomId, addMessage);
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [chatRoomId, addMessage]);

  function handleNextPage() {
    if (hasNextPage && !isFetchingNextPage) {
      console.log('fetching');
      fetchNextPage();
    }
  }

  async function onSend(
    content: string,
    selectedFiles: FileType[] = [],
    selectedImages: ImageType[] = [],
    messageId?: string,
  ) {
    const uploadedFiles = await processAttachments({
      bucket: 'chat-files',
      attachments: selectedFiles,
      defaultMimeType: 'application/octet-stream',
    });
    const uploadedImages = await processAttachments({
      bucket: 'chat-images',
      attachments: selectedImages,
      defaultMimeType: 'image/jpeg',
    });
    const allAttachments = [...uploadedFiles, ...uploadedImages];

    try {
      if (messageId) {
        const updatedMessage = await editMessage({ messageId, content });
        updateMessage(updatedMessage);
        setEditingMessage(null);
        return;
      }

      await sendMessage({
        chatId: chatRoomId,
        userId: user?.id!,
        username: user?.username,
        content,
        attachments: allAttachments,
      });

      if (participants) {
        await addFileAccess({
          chatroomId: chatRoomId,
          files: allAttachments,
          participants,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  return (
    <ImageBackground
      source={getBackgroundImage(theme, 'chat')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Chat
          messages={messages}
          mode={'user'}
          isTyping={false}
          onSend={onSend}
          editingMessage={editingMessage}
          onEditCancel={() => setEditingMessage(null)}
          onEditMessage={setEditingMessage}
          handleNextPage={handleNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
