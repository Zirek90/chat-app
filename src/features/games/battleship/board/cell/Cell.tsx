import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CellInterface } from '../../interface';
import { useBattleshipStore } from '../../store';
import { COLORS } from '@/src/constants';

type CellProps = CellInterface;

export function Cell(props: CellProps) {
  const { row, col } = props;
  const grid = useBattleshipStore((state) => state.grid);
  const placeShip = useBattleshipStore((state) => state.placeShip);
  const selectedShip = useBattleshipStore((state) => state.selectedShip);
  const ships = useBattleshipStore((state) => state.ships);

  const handlePress = () => {
    const ship = ships.find((ship) => ship.id === selectedShip?.id);
    if (!ship) return;

    placeShip(row, col);
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
    backgroundColor: COLORS.shipPlaced,
  },
});
