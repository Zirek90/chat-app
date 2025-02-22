import { Session } from "@supabase/supabase-js";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, PatrickHand_400Regular } from "@expo-google-fonts/patrick-hand";
import { StyleSheet, View } from "react-native";
import { AuthAPI } from "@/src/api/auth";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useUserStore } from "@/src/store";
import { API } from "@/src/api";

SplashScreen.preventAutoHideAsync();

function InitialPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const segments = useSegments();
  const { setUserData } = useUserStore();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Patrick_Hand_Regular: PatrickHand_400Regular,
  });

  useEffect(() => {
    const unsubscribe = AuthAPI.subscribeToAuthChanges((newSession) => {
      setSession(newSession);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === "(tabs)";
    if (session && !inTabsGroup) {
      router.replace("/(tabs)/chat-dashboard");
    } else if (!session) {
      router.replace("/");
    }
  }, [session]);

  useEffect(() => {
    async function fetchUserData() {
      const { user_metadata } = await API.user.getUser();
      if (user_metadata) {
        setUserData({
          id: user_metadata.id || "",
          email: user_metadata.email || "",
          avatar_url: user_metadata.avatar_url || null,
          username: user_metadata.username || "Unknown",
        });
      }
    }

    if (session) {
      fetchUserData();
    }
  }, [session]);

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded && !isLoading) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [fontsLoaded, isLoading]);

  if (!fontsLoaded || isLoading) {
    return <Slot />;
  }

  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Patrick_Hand_Regular",
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <InitialPage />
    </SafeAreaProvider>
  );
}
