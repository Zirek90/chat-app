import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "../shared";
import { useRouter } from "expo-router";
import { ChatRoom } from "@/src/interfaces";

interface ChatRoomItemProps {
  chatRoom: ChatRoom;
  currentUserId: string;
}

export function ChatItem(props: ChatRoomItemProps) {
  const { chatRoom, currentUserId } = props;
  const router = useRouter();

  const otherParticipants = chatRoom.participants?.filter((p) => p !== currentUserId) || ["Unknown"];
  const lastMessage = chatRoom.messages?.[0] || { content: "No messages yet", sender_name: "" };

  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/chat/[chatId]",
          params: { chatId: chatRoom.id },
        })
      }
    >
      <Avatar username={lastMessage.sender_name} avatar={""} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatTitle}>{otherParticipants.length > 1 ? "Group Chat" : lastMessage?.sender_name}</Text>
        <Text style={styles.lastMessage}>{lastMessage?.content}</Text>
      </View>

      <Text style={styles.timestamp}>
        {lastMessage?.timestamp ? new Date(lastMessage.timestamp).toLocaleTimeString() : ""}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#ffffffe6",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 5,
  },
  chatTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMessage: {
    color: "#666",
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
});
