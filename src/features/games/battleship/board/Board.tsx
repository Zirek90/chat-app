import { View, StyleSheet } from "react-native";
import { Cell } from "./cell";

export function Board() {
  const gridSize = 10;

  return (
    <View style={styles.board}>
      {Array.from({ length: gridSize }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Array.from({ length: gridSize }).map((_, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
});
