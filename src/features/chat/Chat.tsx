import { FlatList } from "react-native";
import { Message } from "./message";
import { MessageForm } from "./message-form";
import { Loader } from "./loader";
import { ChatInterface } from "./interfaces";
import { useEffect, useRef } from "react";

export function Chat(props: ChatInterface) {
  const { messages, mode, onSend, isTyping } = props;
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Message message={item} mode={mode} />}
      />
      {isTyping && <Loader />}
      <MessageForm onSend={onSend} />
    </>
  );
}
