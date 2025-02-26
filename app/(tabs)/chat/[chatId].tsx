import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { API } from '@/src/api';
import { Chat } from '@/src/features';
import { supabase } from '@/src/libs/supabase';
import { useThemeStore, useUserStore } from '@/src/store';
import { useChatStore } from '@/src/store/useChatStore';
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

  const { id, username } = useUserStore();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const msgs = await API.chat.getMessages(chatRoomId);

        setMessages(msgs);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    if (!chatRoomId) return;
    fetchMessages();

    const channel = API.chat.subscribeToMessages(chatRoomId, addMessage);
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [chatRoomId, setMessages, addMessage]);

  async function onSend(newMessageText: string, messageId?: string) {
    try {
      if (!messageId) {
        await API.chat.sendMessage(chatRoomId, id, username, newMessageText);
        return;
      }

      const updatedMessage = await API.chat.editMessage(messageId, newMessageText);
      updateMessage(updatedMessage);
      setEditingMessage(null);
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
