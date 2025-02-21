import { supabase } from "@/src/libs/supabase";
import { Session } from "@supabase/supabase-js";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, PatrickHand_400Regular } from "@expo-google-fonts/patrick-hand";
import { StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync();

function InitialPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Patrick_Hand_Regular: PatrickHand_400Regular,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    router.push("/(chat)/chat-dashboard");
  }, [session]);

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded && !isLoading) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [fontsLoaded, isLoading]);

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
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
  return <InitialPage />;
}
