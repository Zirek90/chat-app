import { useEffect, useState } from 'react';
import { useFonts, PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand';
import { Session } from '@supabase/supabase-js';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { API } from '@/src/api';
import { AuthAPI } from '@/src/api/auth';
import { useUserStore } from '@/src/store';

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

    const inTabsGroup = segments[0] === '(tabs)';
    if (session && !inTabsGroup) {
      router.replace('/(tabs)/chat/chat-dashboard');
    } else if (!session) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, session]);

  useEffect(() => {
    async function fetchUserData() {
      const { user_metadata } = await API.user.getUser();
      const avatar = await API.storage.getAvatar('avatars', user_metadata.avatar);
      if (user_metadata) {
        setUserData({
          id: user_metadata.sub || '',
          email: user_metadata.email || '',
          avatar: avatar ?? null,
          username: user_metadata.username || 'Unknown',
        });
      }
    }

    if (session) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Stack.Screen
          name="find-people"
          options={{ title: 'Find people', presentation: 'modal' }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Patrick_Hand_Regular',
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <InitialPage />
    </SafeAreaProvider>
  );
}
