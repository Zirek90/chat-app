import { supabase } from "@/src/lib/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View, ImageBackground, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert(error.message);
      return;
    }
    router.push("/");
    setLoading(false);
  }

  return (
    <ImageBackground
      source={require("../assets/app-images/grayscale/background-login.jpg")}
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
            onPress={signInWithEmail}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
        <Pressable disabled={loading} onPress={() => router.push("/signup")}>
          <Text style={styles.linkText}>Don't have account yet? Sign Up!</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 300,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonPressed: {
    backgroundColor: "rgba(200, 200, 200, 0.9)",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  linkText: {
    marginTop: 10,
    fontSize: 14,
    color: "#004cff",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
