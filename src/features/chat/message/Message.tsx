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
  const isMe = message.sender_id === userId;
  const isAI = mode === "ai";

  return (
    <View style={[styles.container, isMe ? styles.userContainer : styles.externalContainer]}>
      {!isMe && <Avatar avatar={message.avatar} username={isAI ? "AI" : message.sender_name} />}

      <View style={[styles.messageContent, styles.messageShared, isMe ? styles.userMessage : styles.externalMessage]}>
        <Text style={styles.messageText}>{message.content}</Text>
        <Text style={styles.timestamp}>{new Date(message.timestamp).toLocaleTimeString()}</Text>
      </View>

      {isMe && <Avatar avatar={message.avatar} username={message.sender_name} />}
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
});
