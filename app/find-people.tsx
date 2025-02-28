import { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { API } from '@/src/api/api';
import { useUserQuery, useUsersWithAvatarsQuery } from '@/src/api/queries';
import { Avatar, Text, TextInput } from '@/src/components';
import { COLORS } from '@/src/constants';
import { useThemeStore } from '@/src/store';
import { getBackgroundImage } from '@/src/utils';

export default function FindPeople() {
  const { theme } = useThemeStore();
  const { data: user } = useUserQuery();
  const { data: usersWithAvatars, isLoading } = useUsersWithAvatarsQuery(user?.id || null);
  const [search, setSearch] = useState('');
  const filteredUsers = useMemo(
    () =>
      (usersWithAvatars || []).filter((u) =>
        u.username!.toLowerCase().includes(search.toLowerCase()),
      ),
    [usersWithAvatars, search],
  );
  const router = useRouter();

  async function handleChat(participantId: string) {
    if (!user?.id) return;

    try {
      const roomId = await API.chat.getOrCreateChatroom(user.id, participantId);
      router.replace({
        pathname: '/(tabs)/chat/[chatId]',
        params: { chatId: roomId },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Unknown error for creating a chat room', error);
      }
    }
  }

  return (
    <ImageBackground
      source={getBackgroundImage(theme, 'find_people')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search people..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleChat(item.id)}
                style={styles.userItem}
                activeOpacity={0.7}
              >
                <Avatar username={item.username || ''} avatar={item.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.username}>{item.username}</Text>
                </View>
                <TouchableOpacity onPress={() => handleChat(item.id)} style={styles.chatButton}>
                  <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
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
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  chatButton: {
    backgroundColor: COLORS.chatButton,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  container: {
    backgroundColor: COLORS.overlay,
    flex: 1,
    padding: 15,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    fontSize: 16,
    marginBottom: 10,
    padding: 12,
    paddingLeft: 15,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userItem: {
    alignItems: 'center',
    backgroundColor: COLORS.containerBackground,
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  username: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '500',
  },
});
