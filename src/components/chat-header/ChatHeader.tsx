import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from '../shared';
import { API } from '@/src/api';
import { useGetProfileWithAvatar } from '@/src/hooks';
import { useUserStore } from '@/src/store';

interface ChatHeaderProps {
  chatId: string;
}

export function ChatHeader(props: ChatHeaderProps) {
  const { chatId } = props;
  const currentUserId = useUserStore((state) => state.id);
  const [participantsId, setParticipantId] = useState<string | null>(null);
  const participantProfile = useGetProfileWithAvatar(participantsId);

  useEffect(() => {
    async function fetchChatDetails() {
      try {
        const participants = await API.chat.getChatParticipants(chatId);
        const otherUserId = participants?.find((id) => id !== currentUserId);
        if (!otherUserId) return;

        setParticipantId(otherUserId);
      } catch (error) {
        console.error('Error fetching chat details:', error);
      }
    }

    fetchChatDetails();
  }, [chatId, currentUserId]);

  return (
    <View style={styles.container}>
      <Avatar username={participantProfile?.username || ''} avatar={participantProfile?.avatar} />
      <Text style={styles.username}>{participantProfile?.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});
