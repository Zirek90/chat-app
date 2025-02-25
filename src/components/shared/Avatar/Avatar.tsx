import { Image, StyleSheet, View } from 'react-native';
import { Text } from '../Text';
import { COLORS } from '@/src/constants';

interface AvatarProps {
  avatar?: string | null;
  username: string;
}

export function Avatar({ avatar, username }: AvatarProps) {
  const initials = username.slice(0, 2).toUpperCase();

  return avatar ? (
    <Image source={{ uri: avatar }} style={styles.avatar} />
  ) : (
    <View style={styles.initialsContainer}>
      <Text style={styles.initialsText}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 15,
    height: 30,
    marginHorizontal: 5,
    width: 30,
  },
  initialsContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.initialsContainer,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    marginHorizontal: 5,
    width: 30,
  },
  initialsText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
