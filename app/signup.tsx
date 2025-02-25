import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, StyleSheet, View, ImageBackground, Pressable } from 'react-native';
import { API } from '@/src/api';
import { Text, TextInput } from '@/src/components';
import { COLORS } from '@/src/constants';
import { useThemeStore } from '@/src/store';
import { getBackgroundImage } from '@/src/utils';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useThemeStore();

  async function signUpWithEmail() {
    setLoading(true);
    try {
      const session = await API.auth.signup({ email, password, username });
      if (!session) {
        Alert.alert('Please check your inbox for email verification!');
        return;
      }
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        console.error('Unknown error for login', error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={getBackgroundImage(theme, 'signup')}
      style={styles.background}
      resizeMode="stretch"
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Binatang Chat</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder="Email"
            placeholderTextColor="#bbb"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(e) => setUsername(e)}
            placeholder="Username"
            placeholderTextColor="#bbb"
            autoCapitalize="none"
          />
          <TextInput
            onChangeText={(p) => setPassword(p)}
            style={styles.input}
            value={password}
            placeholder="Password"
            placeholderTextColor="#bbb"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            disabled={loading}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={signUpWithEmail}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
        <Pressable disabled={loading} onPress={() => router.push('/')}>
          <Text style={styles.linkText}>Have account already? Log in!</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.buttonBackground,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    maxWidth: 300,
    width: '100%',
  },
  buttonPressed: {
    backgroundColor: COLORS.buttonPressed,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    color: COLORS.inputText,
    fontSize: 18,
    marginBottom: 12,
    padding: 12,
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
    maxWidth: 300,
    width: '100%',
  },
  linkText: {
    color: COLORS.linkText,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  welcomeText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    textShadowColor: COLORS.shadowColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
