import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from '../shared';
import { useChatParticipantsQuery, useUserProfileQuery, useUserQuery } from '@/src/api/queries';
interface ChatHeaderProps {
  chatId: string;
}

export function ChatHeader(props: ChatHeaderProps) {
  const { chatId } = props;
  const { data: user } = useUserQuery();
  const { data: participants } = useChatParticipantsQuery(chatId);
  const participantId = useMemo(
    () => participants?.find((id) => id !== user?.id) || null,
    [participants, user],
  );
  const { data: participant } = useUserProfileQuery(participantId || null);

  return (
    <View style={styles.container}>
      <Avatar username={participant?.username || ''} avatar={participant?.avatar} />
      <Text style={styles.username}>{participant?.username}</Text>
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
