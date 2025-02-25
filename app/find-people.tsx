import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { API } from '@/src/api';
import { Avatar, Text, TextInput } from '@/src/components';
import { COLORS } from '@/src/constants';
import { UserDataInterface } from '@/src/interfaces';
import { useThemeStore, useUserStore } from '@/src/store';
import { getBackgroundImage } from '@/src/utils';

export default function FindPeople() {
  const { theme } = useThemeStore();
  const currentUserId = useUserStore((state) => state.id);
  const [users, setUsers] = useState<UserDataInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserDataInterface[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = (await API.user.getAllUsers(currentUserId)) as UserDataInterface[];
        const usersWithAvatars = await Promise.all(
          userList.map(async (user) => {
            const avatar = user.avatar ? await API.storage.getAvatar('avatars', user.avatar) : null;
            return { ...user, avatar };
          }),
        );

        setUsers(usersWithAvatars);
        setFilteredUsers(usersWithAvatars);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!currentUserId) return;
    fetchUsers();
  }, [currentUserId]);

  function handleSearch(text: string) {
    setSearch(text);
    setFilteredUsers(
      users.filter((user) => user.username.toLowerCase().includes(text.toLowerCase())),
    );
  }

  async function handleChat(userId: string) {
    if (!currentUserId) return;

    try {
      const roomId = await API.chat.getOrCreateChatroom(currentUserId, userId);
      router.replace({
        pathname: '/(tabs)/chat/[chatId]',
        params: { chatId: roomId },
      });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
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
          onChangeText={handleSearch}
          autoCorrect={false}
        />
        {loading ? (
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
                <Avatar username={item.username} avatar={item.avatar} />
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
