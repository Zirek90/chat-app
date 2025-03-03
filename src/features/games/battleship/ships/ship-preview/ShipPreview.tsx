import { StyleSheet, View } from 'react-native';
import { useBattleshipStore } from '../../store';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

export function ShipPreview() {
  const selectedShip = useBattleshipStore((state) => state.selectedShip);
  const isHorizontal = useBattleshipStore((state) => state.isHorizontal);

  if (!selectedShip) return null;

  const shipStylePosition = {
    width: isHorizontal ? selectedShip.size * 12 : 12,
    height: isHorizontal ? 12 : selectedShip.size * 12,
  };
  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewText}>Preview:</Text>
      <View
        style={[
          styles.previewShip,
          isHorizontal ? styles.horizontal : styles.vertical,
          shipStylePosition,
        ]}
      >
        {Array(selectedShip.size)
          .fill(null)
          .map((ship) => (
            <View key={ship.id} style={styles.previewCell} />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: COLORS.previewContainer,
  },
  previewText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.white,
    marginRight: 6,
  },
  previewShip: {
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  previewCell: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.shipPlaced,
    margin: 1,
    borderRadius: 2,
  },
});
