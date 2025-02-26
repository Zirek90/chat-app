import { useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ChatInterface } from './interfaces';
import { Loader } from './loader';
import { Message } from './message';
import { MessageForm } from './message-form';

export function Chat(props: ChatInterface) {
  const { messages, mode, onSend, isTyping, editingMessage, onEditCancel, onEditMessage } = props;
  const flatListRef = useRef<FlatList>(null);

  function handleScrollToEnd() {
    flatListRef.current?.scrollToEnd({ animated: true });
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Message message={item} mode={mode} onEditMessage={onEditMessage} />
        )}
        onContentSizeChange={handleScrollToEnd}
        onLayout={handleScrollToEnd}
      />
      {isTyping && <Loader />}
      <MessageForm onSend={onSend} editingMessage={editingMessage} onEditCancel={onEditCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
