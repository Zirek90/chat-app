import { ChatHeader } from "@/src/components";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
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
        name="[chatId]"
        options={{
          title: "Chat room",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.replace("/(tabs)/chat/chat-dashboard")}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            );
          },
          headerTitle: () => <ChatHeader />,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return <InitialPage />;
}
