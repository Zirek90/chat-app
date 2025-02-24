import { StyleSheet } from "react-native";
import { Board } from "./board";
import { Ships } from "./ships";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface BattleshipProps {
  user1Id: string;
  user2Id: string;
}

export function Battleship(props: BattleshipProps) {
  const { user1Id, user2Id } = props;
  console.log(`User 1 ID: ${user1Id}, User 2 ID: ${user2Id}`);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Ships />
      <Board />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
