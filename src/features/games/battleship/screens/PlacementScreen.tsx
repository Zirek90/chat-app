import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ships, Board, Timer } from '../components';
import { useLobbyStore, usePlacementStore } from '../store';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

interface PlacementScreenProps {
  playerId: string;
}

export function PlacementScreen(props: PlacementScreenProps) {
  const { playerId } = props;
  const { markShipsPlaced, moveToNextPhase } = useLobbyStore();
  const { remainingShips, grid, placeShip } = usePlacementStore();

  useEffect(() => {
    if (remainingShips === 0) {
      markShipsPlaced(playerId);
    }
  }, [remainingShips, markShipsPlaced, playerId]);

  const handleShipsPlacement = () => {
    moveToNextPhase('battle');
  };

  return (
    <View style={styles.container}>
      <Timer startBattle={handleShipsPlacement} />
      <Ships />
      <Board size="mini" gridData={grid} onCellPress={placeShip} isInteractive={true} />
      <TouchableOpacity
        style={[styles.button, remainingShips > 0 ? styles.buttonDisabled : styles.buttonEnabled]}
        onPress={handleShipsPlacement}
        disabled={Boolean(remainingShips)}
      >
        <Text style={styles.buttonText}>Finish Placement</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonEnabled: {
    backgroundColor: COLORS.start,
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
