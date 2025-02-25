import { useState, useEffect } from "react";
import { ChatAPI } from "@/src/api/chat";
import { ChatItem } from "@/src/components";
import { ChatRoom } from "@/src/interfaces";
import { useThemeStore, useUserStore } from "@/src/store";
import { getBackgroundImage } from "@/src/utils";
import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, View } from "react-native";

export default function ChatDashboard() {
  const { theme } = useThemeStore();
  const { id: userId } = useUserStore();
  const [chatrooms, setChatrooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchChatrooms() {
      try {
        setLoading(true);
        const chats = await ChatAPI.getUserChatrooms(userId);
        console.log(" chats", JSON.stringify(chats));
        setChatrooms(chats);
      } catch (error) {
        console.error("Error fetching chatrooms:", error);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchChatrooms();
  }, [userId]);

  return (
    <ImageBackground source={getBackgroundImage(theme, "chat_dashboard")} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
        ) : (
          <FlatList
            data={chatrooms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatItem chatRoom={item} currentUserId={userId} />}
          />
        )}
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
    padding: 10,
  },
  loader: {
    marginTop: 20,
  },
});
