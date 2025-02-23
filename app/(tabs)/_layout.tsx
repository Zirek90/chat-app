import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

function InitialPage() {
  const router = useRouter();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShadowVisible: false }}>
        <Tabs.Screen
          name="chat-dashboard"
          options={{
            title: "Chat Dashboard",
            tabBarIcon: ({ size, color }) => <Ionicons name="chatbubbles" size={size} color={color} />,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.push("/find-people")} style={{ marginRight: 15 }}>
                <Ionicons name="person-add" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="ai-assistant"
          options={{
            title: "AI Assistant",
            tabBarIcon: ({ size, color }) => <Ionicons name="chatbox-ellipses" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ size, color }) => <Ionicons name="settings" size={size} color={color} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return <InitialPage />;
}
