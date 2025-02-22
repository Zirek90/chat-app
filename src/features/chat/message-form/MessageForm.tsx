import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { MessageFormInterface } from "../interfaces";
import { TextInput } from "@/src/components";

export function MessageForm(props: MessageFormInterface) {
  const { onSend } = props;
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
        multiline
        autoCorrect={false}
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    minHeight: 40,
    maxHeight: 120,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  sendButton: {
    padding: 5,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
});
