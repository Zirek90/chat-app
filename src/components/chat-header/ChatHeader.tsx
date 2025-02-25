import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from '../shared';
import { API } from '@/src/api';
import { useUserStore } from '@/src/store';

interface ChatHeaderProps {
  chatId: string;
}

export function ChatHeader(props: ChatHeaderProps) {
  const { chatId } = props;
  const [otherUser, setOtherUser] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const currentUserId = useUserStore((state) => state.id);

  useEffect(() => {
    async function fetchChatDetails() {
      try {
        const participants = await API.chat.getChatParticipants(chatId);

        const otherUserId = participants?.find((id) => id !== currentUserId);
        if (!otherUserId) return;

        const userProfile = await API.user.getUserProfile(otherUserId);
        if (userProfile) {
          let avatar = null;
          if (userProfile.avatar) {
            avatar = await API.storage.getAvatar('avatars', userProfile.avatar);
          }

          setOtherUser(userProfile?.username);
          setAvatar(avatar);
        }
      } catch (error) {
        console.error('Error fetching chat details:', error);
      }
    }

    fetchChatDetails();
  }, [chatId, currentUserId]);

  return (
    <View style={styles.container}>
      <Avatar username={otherUser || ''} avatar={avatar} />
      <Text style={styles.username}>{otherUser}</Text>
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
