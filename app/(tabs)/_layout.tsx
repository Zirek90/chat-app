import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function InitialPage() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShadowVisible: false }}>
        <Tabs.Screen
          name="chat-dashboard"
          options={{
            title: "Chat Dashboard",
            tabBarIcon: ({ size, color }) => <Ionicons name="chatbubbles" size={size} color={color} />,
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
