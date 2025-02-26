import { MaterialIcons } from '@expo/vector-icons';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageInterface } from '../interfaces';
import { ChatModeType } from '../types';
import { useMessageSwipe } from './useMessageSwipe.hook';
import { Text, Avatar } from '@/src/components';
import { COLORS } from '@/src/constants';
import { useGetProfileWithAvatar } from '@/src/hooks';
import { useUserStore } from '@/src/store';

interface MessageProps {
  message: MessageInterface;
  mode: ChatModeType;
  onEditMessage: (message: MessageInterface) => void;
}

export function Message(props: MessageProps) {
  const { message, mode, onEditMessage } = props;
  const userId = useUserStore((state) => state.id);
  const avatar = useUserStore((state) => state.avatar);
  const isMe = message.sender_id === userId;
  const isAI = mode === 'ai';
  // TODO figure out how to store participant avatars as now we do request for each message and it doesn't have sense
  const participantProfile = useGetProfileWithAvatar(message.sender_id);
  const {
    animatedMessageStyle,
    animatedContainerStyle,
    animatedIconStyle,
    onSwipe,
    emptySwipe,
    resetSwipe,
  } = useMessageSwipe();

  function handleEdit() {
    onEditMessage?.(message);
    resetSwipe();
  }
  return (
    <GestureDetector gesture={!isMe ? emptySwipe : onSwipe}>
      <Animated.View
        style={[
          animatedContainerStyle,
          animatedMessageStyle,
          styles.container,
          isMe ? styles.userContainer : styles.externalContainer,
        ]}
      >
        {!isMe && (
          <Avatar
            avatar={participantProfile?.avatar}
            username={isAI ? 'AI' : message.sender_name}
          />
        )}

        <View style={[styles.messageContent, isMe ? styles.userMessage : styles.externalMessage]}>
          {isMe && (
            <Animated.View style={[animatedIconStyle, styles.editIconContainer]}>
              <TouchableOpacity onPress={handleEdit}>
                <MaterialIcons name="edit" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </Animated.View>
          )}
          <Text style={styles.messageText}>{message.content}</Text>
          <Text style={styles.timestamp}>{new Date(message.timestamp).toLocaleTimeString()}</Text>
        </View>

        {isMe && <Avatar avatar={avatar} username={message.sender_name} />}
      </Animated.View>
    </GestureDetector>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  externalContainer: {
    justifyContent: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.userMessage,
  },
  externalMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.externalMessage,
  },
  messageContent: {
    flexShrink: 1,
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
  editIconContainer: {
    position: 'absolute',
    top: 10,
    left: -50,
    zIndex: 1,
  },
});
