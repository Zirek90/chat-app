import { StyleSheet, View } from 'react-native';
import { Ships, Board, Timer } from '../components';
import { useLobbyStore, usePlacementStore } from '../store';
import { API } from '@/src/api/api';
import { useUserQuery } from '@/src/api/queries';
import { COLORS } from '@/src/constants';

export function PlacementScreen() {
  const { data: user } = useUserQuery();
  const { markShipsPlaced, shipsPlaced, roomId } = useLobbyStore();
  const { remainingShips, grid, placeShip } = usePlacementStore();

  const handleShipsPlacement = () => {
    if (!user || !roomId || remainingShips > 0) return;
    if (shipsPlaced[user.id]) return;

    markShipsPlaced(user.id);
    API.game.sendShipsPlaced(roomId, user.id, user.username, grid as string[][]);
  };

  return (
    <View style={styles.container}>
      <Timer startBattle={handleShipsPlacement} />
      <Ships />
      <Board
        size="full"
        gridData={grid}
        onCellPress={placeShip}
        isInteractive={true}
        boardTitle=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.overlay,
  },
});
