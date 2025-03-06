import { Stack } from 'expo-router';

function InitialPage() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="battleship" options={{ title: 'Battleship' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return <InitialPage />;
}
