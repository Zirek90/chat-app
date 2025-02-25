import { Stack } from 'expo-router';

function InitialPage() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="battleship" />
    </Stack>
  );
}

export default function RootLayout() {
  return <InitialPage />;
}
