import { ImageBackground, StyleSheet, View } from 'react-native';
import { useAiMessageMutation } from '@/src/api/mutations';
import { useUserQuery } from '@/src/api/queries';
import { Chat, MessageInterface } from '@/src/features';
import { useAiChatStore, useThemeStore } from '@/src/store';
import { getBackgroundImage } from '@/src/utils';

export default function AiAssistant() {
  const { theme } = useThemeStore();
  const { messages, isTyping, addMessage, setTyping } = useAiChatStore();
  const { data: user } = useUserQuery();
  const { mutateAsync: sendMessage } = useAiMessageMutation();

  async function onSend(newMessageText: string) {
    const newMessage: MessageInterface = {
      id: Date.now().toString(),
      sender_id: user!.id,
      sender_name: user?.user_metadata?.username,
      content: newMessageText,
      files: [],
      edited: false,
      timestamp: Date.now(),
    };

    addMessage(newMessage);
    setTyping(true);

    try {
      const aiResponseText = await sendMessage([...messages, newMessage]);

      const aiResponse: MessageInterface = {
        id: Date.now().toString() + '_ai',
        sender_id: 'ai',
        sender_name: 'AI assistant',
        content: aiResponseText,
        files: [],
        edited: false,
        timestamp: Date.now(),
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
        <Chat
          messages={messages}
          mode={'ai'}
          onSend={onSend}
          isTyping={isTyping}
          onEditCancel={() => {}}
          onEditMessage={() => {}}
          editingMessage={null}
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
