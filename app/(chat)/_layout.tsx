import { supabase } from "@/src/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

import { Button, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function InitialPage() {
  const router = useRouter();

  async function onSignOut() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="chat-dashboard"
          options={{
            title: "Chat Dashboard",
            headerStyle: { backgroundColor: "#151515" },
            headerTitleStyle: { color: "#fff" },
            headerRight: () => (
              <TouchableOpacity onPress={onSignOut}>
                <Ionicons name="log-out-outline" size={20} color="white" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  router.push("/settings");
                }}
              >
                <Ionicons name="person" size={20} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            presentation: "modal",
            headerLeft: () => <Button title="Close" onPress={() => router.back()} />,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return <InitialPage />;
}
