import { useColors } from "@/src/hooks";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import * as FileSystem from "expo-file-system";

interface AvatarUploaderProps {
  avatarUrl: string | undefined;
  id: string;
  username: string;
  onAvatarUpdate: (filePath: string, base64: string, contentType: string) => void;
  loading: boolean;
}

export function AvatarUploader(props: AvatarUploaderProps) {
  const { avatarUrl, username, onAvatarUpdate, id, loading } = props;
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(avatarUrl);
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
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: "base64" });
      const filePath = `${id}-avatar.png`;
      onAvatarUpdate(filePath, base64, "image/jpeg");
    }
  }

  if (loading) {
    return (
      <View style={styles.avatarContainer}>
        <View style={[styles.avatarFallback, { backgroundColor: avatarFallbackColor }]}>
          <ActivityIndicator size="small" color={textColor} />
        </View>
      </View>
    );
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
