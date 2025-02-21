import { Text } from "@/src/components";
import { ThemeEnum } from "@/src/enums";
import { useColors } from "@/src/hooks";
import { supabase } from "@/src/libs/supabase";
import { useThemeStore } from "@/src/store";
import { getBackgroundImage } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Animated, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const { theme, toggleTheme } = useThemeStore();
  const [userData, setUserData] = useState<{ email: string; avatar_url: string | null; username: string }>({
    email: "",
    avatar_url: null,
    username: "",
  });
  const { avatarFallbackColor, textColor, buttonColor, buttonTextColor } = useColors();

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const metadata = user?.user_metadata;
      if (metadata) {
        setUserData({
          email: metadata.email || "",
          avatar_url: metadata.avatar_url || null,
          username: metadata.username || "Unknown",
        });
      }
    }
    fetchUser();
  }, []);
  // const { data, error } = await supabase.auth.updateUser({
  //   email: 'new@email.com'
  // })

  return (
    <ImageBackground source={getBackgroundImage(theme, "settings")} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {userData.avatar_url ? (
            <Animated.Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarFallback, { backgroundColor: avatarFallbackColor }]}>
              <Text style={[styles.avatarText, { color: textColor }]}>{userData.username.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </View>

        <Text style={[styles.username, { color: textColor }]}>{userData.username}</Text>
        <Text style={[styles.email, { color: textColor }]}>{userData.email}</Text>

        <TouchableOpacity style={[styles.toggleButton, { backgroundColor: buttonColor }]} onPress={toggleTheme}>
          <Ionicons name={theme === "grayscale" ? "moon" : "sunny"} size={24} color={buttonTextColor} />
          <Text style={[styles.toggleText, { color: buttonTextColor }]}>
            {theme === "grayscale" ? "Switch to Colorful" : "Switch to Grayscale"}
          </Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 36,
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
});
