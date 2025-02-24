import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

function InitialPage() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="battleship" />
    </Stack>
  );
}

export default function RootLayout() {
  return <InitialPage />;
}
