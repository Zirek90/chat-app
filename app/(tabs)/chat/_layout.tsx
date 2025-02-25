import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { ChatHeader } from '@/src/components';

function InitialPage() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="chat-dashboard"
        options={{
          title: 'Chat Dashboard',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/find-people')}
              style={styles.touchableMargin}
            >
              <Ionicons name="person-add" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="[chatId]"
        options={({ route }: { route: { params?: { chatId?: string } } }) => ({
          title: 'Chat room',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: () => <ChatHeader chatId={route.params?.chatId!} />,
        })}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return <InitialPage />;
}

const styles = StyleSheet.create({
  touchableMargin: {
    marginRight: 15,
  },
});
