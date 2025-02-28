import { Ionicons } from '@expo/vector-icons';
import { Alert, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { API } from '@/src/api/api';
import { useLogoutMutation, useUploadAvatarMutation } from '@/src/api/mutations';
import { useUserQuery, useUserProfileQuery } from '@/src/api/queries';
import { Text } from '@/src/components';
import { AvatarUploader } from '@/src/components';
import { COLORS } from '@/src/constants';
import { ThemeEnum } from '@/src/enums';
import { useColors } from '@/src/hooks';
import { useThemeStore } from '@/src/store';
import { getBackgroundImage } from '@/src/utils';

export default function Settings() {
  const { theme, toggleTheme } = useThemeStore();
  const { textColor, buttonColor, buttonTextColor } = useColors();
  const { data: user } = useUserQuery();
  const { data: userProfile, isLoading } = useUserProfileQuery(user?.id || null);
  const { mutateAsync: updateAvatar, isPaused } = useUploadAvatarMutation();
  const { mutateAsync: logout } = useLogoutMutation();

  async function onSignOut() {
    await logout();
  }

  async function updateUserProfile(filePath: string, base64: string, contentType: string) {
    try {
      await updateAvatar({ filePath, base64, contentType });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
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
            avatarUrl={userProfile?.avatar || ''}
            username={userProfile?.username || ''}
            onAvatarUpdate={updateUserProfile}
            id={user?.id || ''}
            loading={isPaused || isLoading}
          />

          <Text style={[styles.username, { color: textColor }]}>{userProfile?.username}</Text>
          <Text style={[styles.email, { color: textColor }]}>{user?.email}</Text>

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
