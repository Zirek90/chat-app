import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Board } from '../components';
import { useBattleStore } from '../store/useBattleStore';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

export function BattleScreen() {
  const {
    isMyTurn,
    ourGrid,
    opponentGrid,
    markAttack,
    confirmAttack,
    getCellDisplay,
    selectedAttack,
  } = useBattleStore();
  const isDisabled = !isMyTurn || !selectedAttack;

  return (
    <View style={styles.container}>
      <Text style={styles.turnIndicator}>{isMyTurn ? 'Your Turn' : "Opponent's Turn"}</Text>

      <Board gridData={ourGrid} size="mini" isInteractive={false} boardTitle="Your Board" />
      <View style={styles.divider} />
      <Board
        boardTitle={"Opponent's Board"}
        gridData={opponentGrid.map((row, rowIndex) =>
          row.map((_, colIndex) => getCellDisplay(rowIndex, colIndex)),
        )}
        size="full"
        isInteractive={isMyTurn}
        onCellPress={markAttack}
      />

      <TouchableOpacity
        style={[styles.confirmButton, isDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
        onPress={confirmAttack}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>Confirm Attack</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.overlay,
  },
  turnIndicator: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  confirmButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonEnabled: {
    backgroundColor: COLORS.start,
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  divider: {
    width: '100%',
    borderColor: COLORS.border,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginBottom: 10,
  },
});
