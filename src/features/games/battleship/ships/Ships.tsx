import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useBattleshipStore } from '../store';
import { Ship } from './ship';
import { ShipPreview } from './ship-preview';
import { COLORS } from '@/src/constants';

export function Ships() {
  const ships = useBattleshipStore((state) => state.ships);
  const remainingShips = useBattleshipStore((state) => state.remainingShips);
  const toggleRotation = useBattleshipStore((state) => state.toggleRotation);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.remainingShipsText}>{`Ships left to place: ${remainingShips}`}</Text>
      <View style={styles.shipsList}>
        {ships.map((ship) => (
          <Ship key={ship.id} {...ship} />
        ))}
      </View>
      <TouchableOpacity style={styles.rotateButton} onPress={toggleRotation}>
        <Text style={styles.rotateButtonText}>Rotate ship</Text>
      </TouchableOpacity>
      <ShipPreview />
    </View>
  );
}
const styles = StyleSheet.create({
  rotateButton: {
    marginTop: 10,
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rotateButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  remainingShipsText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  shipsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: COLORS.shipWrapper,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 30,
    padding: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
