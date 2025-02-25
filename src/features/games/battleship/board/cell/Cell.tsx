import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useBattleshipStore } from "../../store";

interface CellProps {
  row: number;
  col: number;
}

export function Cell(props: CellProps) {
  const { row, col } = props;
  const grid = useBattleshipStore((state) => state.grid);
  const placeShip = useBattleshipStore((state) => state.placeShip);
  const unplaceShip = useBattleshipStore((state) => state.unplaceShip);

  const handlePress = () => {
    if (grid[row][col]) {
      unplaceShip(row, col);
    } else {
      placeShip(row, col);
    }
  };

  return (
    <TouchableOpacity style={[styles.cell, grid[row][col] && styles.isMarked]} onPress={handlePress}>
      <Text>{`${String.fromCharCode(65 + row)}${col + 1}`}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "lightgray",
  },
  isMarked: {
    backgroundColor: "green",
  },
});
