import { useColors } from "@/src/hooks";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

interface AvatarUploaderProps {
  avatarUrl: string | null;
  username: string;
  onAvatarUpdate: (newAvatar: string) => void;
}

export function AvatarUploader(props: AvatarUploaderProps) {
  const { avatarUrl, username, onAvatarUpdate } = props;
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(avatarUrl);
  const { avatarFallbackColor, textColor } = useColors();

  useEffect(() => {
    setSelectedAvatar(avatarUrl);
  }, [avatarUrl]);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedAvatar(result.assets[0].uri);
      onAvatarUpdate(result.assets[0].uri);
    }
  }

  return (
    <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
      {selectedAvatar ? (
        <Image source={{ uri: selectedAvatar }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatarFallback, { backgroundColor: avatarFallbackColor }]}>
          <Text style={[styles.avatarText, { color: textColor }]}>{username.charAt(0).toUpperCase()}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
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
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarText: {
    fontSize: 36,
    color: "#fff",
  },
});
