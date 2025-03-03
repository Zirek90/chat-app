import { StyleSheet, TouchableOpacity } from 'react-native';
import { useBattleshipStore } from '../../store';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

export function RorateShip() {
  const toggleRotation = useBattleshipStore((state) => state.toggleRotation);

  return (
    <TouchableOpacity style={styles.rotateButton} onPress={toggleRotation}>
      <Text style={styles.rotateButtonText}>Rotate ship</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rotateButton: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: COLORS.red,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  rotateButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
