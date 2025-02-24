import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

function InitialPage() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="chat-dashboard"
        options={{
          title: "Chat Dashboard",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/find-people")} style={{ marginRight: 15 }}>
              <Ionicons name="person-add" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="[chatId]" // TODO move chat to separate directory and remove chatroom from tabbar
        options={{
          title: "Chat room",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return <InitialPage />;
}
