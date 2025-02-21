import { useThemeStore } from "@/src/store";
import { getBackgroundImage } from "@/src/utils";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function ChatDashboard() {
  const { theme } = useThemeStore();

  return (
    <ImageBackground source={getBackgroundImage(theme, "chat_dashboard")} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text>Chat dashboard</Text>
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
});
