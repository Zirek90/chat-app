import { View, StyleSheet } from "react-native";
import { MessageInterface } from "../interfaces";
import { ChatModeType } from "../types";
import { Text, Avatar } from "@/src/components";
import { useUserStore } from "@/src/store";

interface MessageProps {
  message: MessageInterface;
  mode: ChatModeType;
}

export function Message(props: MessageProps) {
  const { message, mode } = props;
  const userId = useUserStore((state) => state.id);
  const isMe = message.userId === userId;
  const isAI = mode === "ai";

  return (
    <View style={[styles.container, isMe ? styles.userContainer : styles.externalContainer]}>
      {!isMe && <Avatar avatar={message.avatar} username={isAI ? "AI" : message.senderName} />}

      <View style={[styles.messageContent, styles.messageShared, isMe ? styles.userMessage : styles.externalMessage]}>
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={styles.timestamp}>{new Date(message.timestamp).toLocaleTimeString()}</Text>
      </View>

      {isMe && <Avatar avatar={message.avatar} username={message.senderName} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: "100%",
    paddingHorizontal: 5,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  externalContainer: {
    justifyContent: "flex-start",
  },
  messageShared: {
    borderRadius: 10,
    padding: 7,
    maxWidth: "70%",
  },
  userMessage: {
    backgroundColor: "#4caf50",
    alignSelf: "flex-end",
  },
  externalMessage: {
    backgroundColor: "#70adf2",
    alignSelf: "flex-start",
  },
  messageContent: {
    flexShrink: 1,
  },
  messageText: {
    color: "#fff",
  },
  timestamp: {
    fontSize: 10,
    color: "#545454",
    alignSelf: "flex-end",
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginHorizontal: 5,
  },
  aiAvatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "#ff9800",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  aiAvatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
