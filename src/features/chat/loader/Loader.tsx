import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

export function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#555" />
      <Text style={styles.text}>Typing...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  text: {
    marginLeft: 5,
    color: "#555",
    fontSize: 14,
  },
});
