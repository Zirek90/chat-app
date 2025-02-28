import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { useUserChatroomsQuery, useUserQuery } from '@/src/api/queries';
import { ChatItem } from '@/src/components';
import { useThemeStore } from '@/src/store';
import { getBackgroundImage } from '@/src/utils';

export default function ChatDashboard() {
  const { theme } = useThemeStore();
  const { data: user } = useUserQuery();
  const { data: chatrooms, isLoading } = useUserChatroomsQuery(user?.id || null);

  return (
    <ImageBackground
      source={getBackgroundImage(theme, 'chat_dashboard')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
        ) : (
          <FlatList
            data={chatrooms || []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatItem chatRoom={item} currentUserId={user?.id || ''} />}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  loader: {
    marginTop: 20,
  },
});
