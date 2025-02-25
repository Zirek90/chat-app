import { Ionicons } from '@expo/vector-icons';
import { Alert, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { API } from '@/src/api';
import { Text } from '@/src/components';
import { AvatarUploader } from '@/src/components';
import { COLORS } from '@/src/constants';
import { ThemeEnum } from '@/src/enums';
import { useColors } from '@/src/hooks';
import { useThemeStore, useUserStore } from '@/src/store';
import { getBackgroundImage } from '@/src/utils';

export default function Settings() {
  const { theme, toggleTheme } = useThemeStore();
  const { email, avatar, username, setUserAvatar, setLoading, loading, id } = useUserStore();
  const { textColor, buttonColor, buttonTextColor } = useColors();

  async function onSignOut() {
    await API.auth.logout();
  }

  async function updateUserProfile(filePath: string, base64: string, contentType: string) {
    try {
      setLoading(true);
      await API.user.updateProfile({ avatar: filePath });
      await API.storage.uploadAvatar(filePath, base64, contentType);
      const avatar = await API.storage.getAvatar('avatars', filePath);
      setUserAvatar(avatar);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={getBackgroundImage(theme, 'settings')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.topSection}>
          <AvatarUploader
            avatarUrl={avatar || ''}
            username={username}
            onAvatarUpdate={updateUserProfile}
            id={id}
            loading={loading}
          />

          <Text style={[styles.username, { color: textColor }]}>{username}</Text>
          <Text style={[styles.email, { color: textColor }]}>{email}</Text>

          <TouchableOpacity
            style={[styles.toggleButton, { backgroundColor: buttonColor }]}
            onPress={toggleTheme}
          >
            <Ionicons
              name={theme === ThemeEnum.GRAYSCALE ? 'moon' : 'sunny'}
              size={24}
              color={buttonTextColor}
            />
            <Text style={[styles.toggleText, { color: buttonTextColor }]}>
              {theme === ThemeEnum.GRAYSCALE ? 'Switch to Colorful' : 'Switch to Grayscale'}
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
    height: '100%',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
  signOutButton: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.colorfullBorder,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  signOutText: {
    fontSize: 16,
    marginLeft: 10,
  },
  toggleButton: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  toggleText: {
    fontSize: 18,
    marginLeft: 10,
  },
  topSection: {
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    marginBottom: 5,
  },
});
