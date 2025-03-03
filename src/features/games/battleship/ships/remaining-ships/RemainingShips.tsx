import { StyleSheet } from 'react-native';
import { useBattleshipStore } from '../../store';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

export function RemainingShips() {
  const remainingShips = useBattleshipStore((state) => state.remainingShips);

  return <Text style={styles.remainingShipsText}>{`Ships left to place: ${remainingShips}`}</Text>;
}

const styles = StyleSheet.create({
  remainingShipsText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
