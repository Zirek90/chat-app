import { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LobbyPlayer } from '../components/lobby-player';
import { useLobbyStore } from '../store';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

interface LobbyScreenProps {
  playerOneId: string;
  playerTwoId: string;
}

export function LobbyScreen(props: LobbyScreenProps) {
  const { playerOneId, playerTwoId } = props;
  const { players, setPlayers, moveToNextPhase, toggleReady } = useLobbyStore();

  useEffect(() => {
    setPlayers([
      { id: playerOneId, name: 'Player 1', ready: false },
      { id: playerTwoId, name: 'Player 2', ready: false },
    ]);
  }, [playerOneId, playerTwoId, setPlayers]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waiting for Players...</Text>
      {players.map((player) => (
        <LobbyPlayer key={player.id} toggleReady={toggleReady} player={player} />
      ))}

      {players.every((p) => p.ready) && (
        <TouchableOpacity style={styles.startButton} onPress={() => moveToNextPhase('placement')}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.overlay,
    borderRadius: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: COLORS.start,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
