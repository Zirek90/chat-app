import { useEffect } from 'react';
import { useFonts, PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { useSessionQuery } from '../src/api/queries';
import { API } from '@/src/api/api';
import { queryClient } from '@/src/api/query-client';
import { createMessagesTable, flushDatabase } from '@/src/db';

SplashScreen.preventAutoHideAsync();

function InitialPage() {
  const { data: session, isLoading, refetch } = useSessionQuery();
  const segments = useSegments();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Patrick_Hand_Regular: PatrickHand_400Regular,
  });

  useEffect(() => {
    const unsubscribe = API.auth.subscribeToAuthChanges(() => {
      refetch();
    });

    return () => unsubscribe();
  }, [refetch]);

  useEffect(() => {
    async function initializeDatabase() {
      await createMessagesTable();
      // await flushDatabase();
      console.log('SQLite messages table initialized');
    }

    initializeDatabase();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === '(tabs)';
    if (session && !inTabsGroup) {
      router.replace('/(tabs)/games/battleship');
    } else if (!session) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, session]);

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
      <QueryClientProvider client={queryClient}>
        <InitialPage />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
