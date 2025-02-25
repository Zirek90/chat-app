import { View, Text, StyleSheet } from 'react-native';
import { useBattleshipStore } from '../store';
import { Ship } from './ship';
import { COLORS } from '@/src/constants';

export function Ships() {
  const ships = useBattleshipStore((state) => state.ships);
  const remainingShips = useBattleshipStore((state) => state.remainingShips);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.remainingShipsText}>{`Ships left to place: ${remainingShips}`}</Text>
      <View style={styles.shipsList}>
        {ships.map((ship) => (
          <Ship key={ship.id} {...ship} />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  remainingShipsText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  shipsList: {
    flexDirection: 'row',
  },
  wrapper: {
    backgroundColor: COLORS.shipWrapper,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 30,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
