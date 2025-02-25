import { View, StyleSheet } from 'react-native';
import { MessageInterface } from '../interfaces';
import { ChatModeType } from '../types';
import { Text, Avatar } from '@/src/components';
import { COLORS } from '@/src/constants';
import { useUserStore } from '@/src/store';

interface MessageProps {
  message: MessageInterface;
  mode: ChatModeType;
}

export function Message(props: MessageProps) {
  const { message, mode } = props;
  const userId = useUserStore((state) => state.id);
  const isMe = message.sender_id === userId;
  const isAI = mode === 'ai';

  return (
    <View style={[styles.container, isMe ? styles.userContainer : styles.externalContainer]}>
      {!isMe && <Avatar avatar={message.avatar} username={isAI ? 'AI' : message.sender_name} />}

      <View
        style={[
          styles.messageContent,
          styles.messageShared,
          isMe ? styles.userMessage : styles.externalMessage,
        ]}
      >
        <Text style={styles.messageText}>{message.content}</Text>
        <Text style={styles.timestamp}>{new Date(message.timestamp).toLocaleTimeString()}</Text>
      </View>

      {isMe && <Avatar avatar={message.avatar} username={message.sender_name} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 5,
    width: '100%',
  },
  externalContainer: {
    justifyContent: 'flex-start',
  },
  externalMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.externalMessage,
  },
  messageContent: {
    flexShrink: 1,
  },
  messageShared: {
    borderRadius: 10,
    maxWidth: '70%',
    padding: 7,
  },
  messageText: {
    color: COLORS.white,
  },
  timestamp: {
    alignSelf: 'flex-end',
    color: COLORS.timestamp,
    fontSize: 10,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.userMessage,
  },
});
