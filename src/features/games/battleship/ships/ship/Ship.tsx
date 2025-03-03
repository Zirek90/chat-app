import { StyleSheet, TouchableOpacity } from 'react-native';
import { ShipInterface } from '../../interface';
import { useBattleshipStore } from '../../store';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

type ShipProps = ShipInterface;

export function Ship(props: ShipProps) {
  const { id, name, size, placed } = props;
  const selectedShip = useBattleshipStore((state) => state.selectedShip);
  const setSelectedShip = useBattleshipStore((state) => state.setSelectedShip);
  const unplaceShip = useBattleshipStore((state) => state.unplaceShip);

  return (
    <TouchableOpacity
      onPress={() => (placed ? unplaceShip(id) : setSelectedShip(id))}
      style={[
        styles.shipCard,
        placed ? styles.shipPlaced : styles.shipPending,
        selectedShip?.id === id && styles.shipSelected,
      ]}
    >
      <Text style={styles.shipName}>{name}</Text>
      <Text style={styles.shipSize}>{`Size: ${size} cells`}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shipCard: {
    alignItems: 'center',
    borderColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 2,
    elevation: 4,
    justifyContent: 'center',
    margin: 3,
    padding: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shipName: {
    color: COLORS.shipName,
    fontSize: 13,
    fontWeight: 'bold',
  },
  shipPending: {
    backgroundColor: COLORS.shipPending,
  },
  shipSelected: {
    backgroundColor: COLORS.shipSelected,
  },
  shipPlaced: {
    backgroundColor: COLORS.shipPlaced,
  },
  shipSize: {
    color: COLORS.shipText,
    fontSize: 10,
  },
});
