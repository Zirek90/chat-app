import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { View, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '@/src/constants';
import { useColors } from '@/src/hooks';

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
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedAvatar(result.assets[0].uri);
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
      const filePath = `${id}-avatar.png`;
      onAvatarUpdate(filePath, base64, 'image/jpeg');
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
          <Text style={[styles.avatarText, { color: textColor }]}>
            {username.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 50,
    height: '100%',
    width: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.avatarFallback,
    borderRadius: 50,
    height: 100,
    justifyContent: 'center',
    marginBottom: 15,
    width: 100,
  },
  avatarFallback: {
    alignItems: 'center',
    borderColor: COLORS.white,
    borderRadius: 50,
    borderWidth: 3,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 36,
  },
});
