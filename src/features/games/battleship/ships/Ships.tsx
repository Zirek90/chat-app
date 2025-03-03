import { View, StyleSheet } from 'react-native';
import { useBattleshipStore } from '../store';
import { RemainingShips } from './remaining-ships';
import { RorateShip } from './rotate-ship';
import { Ship } from './ship';
import { ShipPreview } from './ship-preview';
import { COLORS } from '@/src/constants';

export function Ships() {
  const ships = useBattleshipStore((state) => state.ships);

  return (
    <View style={styles.wrapper}>
      <RemainingShips />
      <View style={styles.shipsList}>
        {ships.map((ship) => (
          <Ship key={ship.id} {...ship} />
        ))}
      </View>
      <RorateShip />
      <ShipPreview />
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.shipWrapper,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
  },
  shipsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
