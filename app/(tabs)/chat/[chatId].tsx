import { API } from "@/src/api";
import { Chat, MessageInterface } from "@/src/features";
import { supabase } from "@/src/libs/supabase";
import { useThemeStore, useUserStore } from "@/src/store";
import { useChatStore } from "@/src/store/useChatStore";
import { getBackgroundImage } from "@/src/utils";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function ChatRoom() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const chatRoomId = Array.isArray(chatId) ? chatId[0] : chatId;
  const { theme } = useThemeStore();
  const { messages, addMessage, setMessages } = useChatStore();
  const { id, username } = useUserStore();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const msgs = await API.chat.getMessages(chatRoomId);

        setMessages(msgs);
      } catch (error) {
        console.error("Error fetching messages:", error);
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
  }, [chatRoomId]);

  async function onSend(newMessageText: string) {
    try {
      await API.chat.sendMessage(chatRoomId, id, username, newMessageText);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <ImageBackground source={getBackgroundImage(theme, "chat")} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Chat messages={messages} mode={"user"} isTyping={false} onSend={onSend} />
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
