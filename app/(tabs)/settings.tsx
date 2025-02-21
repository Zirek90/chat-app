import { API } from "@/src/api";
import { Text } from "@/src/components";
import { AvatarUploader } from "@/src/components";
import { ThemeEnum } from "@/src/enums";
import { useColors } from "@/src/hooks";
import { useThemeStore } from "@/src/store";
import { getBackgroundImage } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const { theme, toggleTheme } = useThemeStore();
  const [userData, setUserData] = useState<{ email: string; avatar_url: string | null; username: string }>({
    email: "",
    avatar_url: null,
    username: "",
  });
  const { textColor, buttonColor, buttonTextColor } = useColors();

  async function onSignOut() {
    await API.auth.logout();
  }

  useEffect(() => {
    async function fetchUser() {
      const { user_metadata } = await API.user.getUser();

      if (user_metadata) {
        setUserData({
          email: user_metadata.email || "",
          avatar_url: user_metadata.avatar_url || null,
          username: user_metadata.username || "Unknown",
        });
      }
    }
    fetchUser();
  }, []);

  async function updateUserProfile(newAvatar: string) {
    try {
      await API.user.updateProfile({ avatar_url: newAvatar });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    }
  }

  return (
    <ImageBackground source={getBackgroundImage(theme, "settings")} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.topSection}>
          <AvatarUploader
            avatarUrl={userData.avatar_url}
            username={userData.username}
            onAvatarUpdate={updateUserProfile}
          />

          <Text style={[styles.username, { color: textColor }]}>{userData.username}</Text>
          <Text style={[styles.email, { color: textColor }]}>{userData.email}</Text>

          <TouchableOpacity style={[styles.toggleButton, { backgroundColor: buttonColor }]} onPress={toggleTheme}>
            <Ionicons name={theme === ThemeEnum.GRAYSCALE ? "moon" : "sunny"} size={24} color={buttonTextColor} />
            <Text style={[styles.toggleText, { color: buttonTextColor }]}>
              {theme === ThemeEnum.GRAYSCALE ? "Switch to Colorful" : "Switch to Grayscale"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={onSignOut}>
          <Ionicons name="log-out-outline" size={24} color="#000" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  topSection: {
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  toggleText: {
    fontSize: 18,
    marginLeft: 10,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF6F61",
    paddingVertical: 6,
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  signOutText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
