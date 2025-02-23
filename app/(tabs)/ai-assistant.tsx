import { useChatStore, useThemeStore, useUserStore } from "@/src/store";
import { getBackgroundImage } from "@/src/utils";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Chat, MessageInterface } from "@/src/features";
import { API } from "@/src/api";

export default function AiAssistant() {
  const { theme } = useThemeStore();
  const { messages, isTyping, addMessage, setTyping } = useChatStore();
  const { username, id } = useUserStore();

  async function onSend(newMessageText: string) {
    const newMessage: MessageInterface = {
      id: Date.now().toString(),
      userId: id,
      senderName: username,
      text: newMessageText,
      timestamp: Date.now(),
    };

    addMessage(newMessage);
    setTyping(true);

    try {
      const aiResponseText = await API.ai.sendMessageToAiAssistant([...messages, newMessage]);

      const aiResponse: MessageInterface = {
        id: Date.now().toString() + "_ai",
        userId: "ai",
        senderName: "AI assistant",
        text: aiResponseText,
        timestamp: Date.now(),
      };

      addMessage(aiResponse);
    } catch (error) {
      console.error("AI response error:", error);
    } finally {
      setTyping(false);
    }
  }

  return (
    <ImageBackground source={getBackgroundImage(theme, "ai_assistant")} style={styles.background} resizeMode="stretch">
      <View style={styles.container}>
        <Chat messages={messages} mode={"ai"} onSend={onSend} isTyping={isTyping} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
