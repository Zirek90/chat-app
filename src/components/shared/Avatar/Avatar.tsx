import { Image, StyleSheet, View } from "react-native";
import { Text } from "../Text";

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
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  initialsContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ff9800",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  initialsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
