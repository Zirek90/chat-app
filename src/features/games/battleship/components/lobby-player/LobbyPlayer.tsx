import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Player } from '../../interface';
import { Text } from '@/src/components';
import { COLORS } from '@/src/constants';

interface LobbyPlayerProps {
  toggleReady: (id: string) => void;
  player: Player;
}

export function LobbyPlayer(props: LobbyPlayerProps) {
  const { toggleReady, player } = props;

  return (
    <View style={styles.playerCard}>
      <Text style={styles.playerName}>
        {player.name} {player.ready ? '✅' : '❌'}
      </Text>
      <TouchableOpacity
        style={[styles.button, player.ready ? styles.readyButton : styles.notReadyButton]}
        onPress={() => toggleReady(player.id)}
      >
        <Text style={styles.buttonText}>{player.ready ? 'Unready' : 'Ready'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  playerCard: {
    backgroundColor: COLORS.overlay,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  playerName: {
    fontSize: 18,
    color: COLORS.white,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 10,
    borderRadius: 6,
  },
  readyButton: {
    backgroundColor: COLORS.playerReady,
  },
  notReadyButton: {
    backgroundColor: COLORS.playerNotReady,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
