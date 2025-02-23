import { API } from "@/src/api";
import { Avatar, Text, TextInput } from "@/src/components";
import { UserDataInterface } from "@/src/interfaces";
import { useThemeStore, useUserStore } from "@/src/store";
import { getBackgroundImage } from "@/src/utils";
import { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";

export default function FindPeople() {
  const { theme } = useThemeStore();
  const id = useUserStore((state) => state.id);
  const [users, setUsers] = useState<UserDataInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserDataInterface[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = (await API.user.getAllUsers(id)) as UserDataInterface[];
        const usersWithAvatars = await Promise.all(
          userList.map(async (user) => {
            const avatar = user.avatar ? await API.storage.getAvatar("avatars", user.avatar) : null;
            return { ...user, avatar };
          })
        );

        setUsers(usersWithAvatars);
        setFilteredUsers(usersWithAvatars);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!id) return;
    fetchUsers();
  }, [id]);

  function handleSearch(text: string) {
    setSearch(text);
    setFilteredUsers(users.filter((user) => user.username.toLowerCase().includes(text.toLowerCase())));
  }

  function handleChat(userId: string) {
    console.log(`Start chat with ${userId}`);
  }

  return (
    <ImageBackground source={getBackgroundImage(theme, "find_people")} style={styles.background} resizeMode="cover">
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
              <TouchableOpacity onPress={() => handleChat(item.id)} style={styles.userItem} activeOpacity={0.7}>
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
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 25,
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 16,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  status: {
    color: "#aaa",
    fontSize: 14,
  },
  chatButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
