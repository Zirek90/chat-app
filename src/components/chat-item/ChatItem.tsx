import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from '../shared';
import { COLORS } from '@/src/constants';
import { ChatRoom } from '@/src/interfaces';

interface ChatRoomItemProps {
  chatRoom: ChatRoom;
  currentUserId: string;
}

export function ChatItem(props: ChatRoomItemProps) {
  const { chatRoom, currentUserId } = props;
  const router = useRouter();

  const otherParticipants = chatRoom.participants?.filter((p) => p !== currentUserId) || [
    'Unknown',
  ];
  const lastMessage = chatRoom.messages?.[0] || { content: 'No messages yet', sender_name: '' };

  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        router.push({
          pathname: '/(tabs)/chat/[chatId]',
          params: { chatId: chatRoom.id },
        })
      }
    >
      <Avatar username={lastMessage.sender_name} avatar={''} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatTitle}>
          {otherParticipants.length > 1 ? 'Group Chat' : lastMessage?.sender_name}
        </Text>
        <Text style={styles.lastMessage}>{lastMessage?.content}</Text>
      </View>

      <Text style={styles.timestamp}>
        {lastMessage?.timestamp ? new Date(lastMessage.timestamp).toLocaleTimeString() : ''}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatInfo: {
    flex: 1,
    marginLeft: 5,
  },
  chatItem: {
    alignItems: 'center',
    backgroundColor: COLORS.containerBackground,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: COLORS.messageText,
    fontSize: 14,
  },
  timestamp: {
    color: COLORS.timestamp,
    fontSize: 12,
  },
});
