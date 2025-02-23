import { useRef } from "react";
import { FlatList } from "react-native";
import { Message } from "./message";
import { MessageForm } from "./message-form";
import { Loader } from "./loader";
import { ChatInterface } from "./interfaces";

export function Chat(props: ChatInterface) {
  const { messages, mode, onSend, isTyping } = props;
  const flatListRef = useRef<FlatList>(null);

  function handleScrollToEnd() {
    flatListRef.current?.scrollToEnd({ animated: true });
  }

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Message message={item} mode={mode} />}
        onContentSizeChange={handleScrollToEnd}
        onLayout={handleScrollToEnd}
      />
      {isTyping && <Loader />}
      <MessageForm onSend={onSend} />
    </>
  );
}
