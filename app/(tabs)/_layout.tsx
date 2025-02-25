import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

function InitialPage() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Tabs screenOptions={{ headerShadowVisible: false }}>
        <Tabs.Screen
          name="chat"
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ai-assistant"
          options={{
            title: 'AI Assistant',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="chatbox-ellipses" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="games"
          options={{
            title: 'Games',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="game-controller" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
