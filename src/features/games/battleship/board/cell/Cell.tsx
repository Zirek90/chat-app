import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useBattleshipStore } from '../../store';
import { COLORS } from '@/src/constants';

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
    <TouchableOpacity
      style={[styles.cell, grid[row][col] && styles.isMarked]}
      onPress={handlePress}
    >
      <Text>{`${String.fromCharCode(65 + row)}${col + 1}`}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    backgroundColor: COLORS.cellBackground,
    borderColor: COLORS.black,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    margin: 1,
    width: 30,
  },
  isMarked: {
    backgroundColor: COLORS.isMarked,
  },
});
