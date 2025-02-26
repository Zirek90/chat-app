import { ImageBackground, StyleSheet, View } from 'react-native';
import { API } from '@/src/api';
import { Chat, MessageInterface } from '@/src/features';
import { useAiChatStore, useThemeStore, useUserStore } from '@/src/store';
import { getBackgroundImage } from '@/src/utils';

export default function AiAssistant() {
  const { theme } = useThemeStore();
  const { messages, isTyping, addMessage, setTyping } = useAiChatStore();
  const { username, id } = useUserStore();

  async function onSend(newMessageText: string) {
    const newMessage: MessageInterface = {
      id: Date.now().toString(),
      sender_id: id,
      sender_name: username,
      content: newMessageText,
      files: [],
      edited: false,
      timestamp: Date.now().toString(),
    };

    addMessage(newMessage);
    setTyping(true);

    try {
      const aiResponseText = await API.ai.sendMessageToAiAssistant([...messages, newMessage]);

      const aiResponse: MessageInterface = {
        id: Date.now().toString() + '_ai',
        sender_id: 'ai',
        sender_name: 'AI assistant',
        content: aiResponseText,
        files: [],
        edited: false,
        timestamp: Date.now().toString(),
      };

      addMessage(aiResponse);
    } catch (error) {
      console.error('AI response error:', error);
    } finally {
      setTyping(false);
    }
  }

  return (
    <ImageBackground
      source={getBackgroundImage(theme, 'ai_assistant')}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <Chat messages={messages} mode={'ai'} onSend={onSend} isTyping={isTyping} />
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
