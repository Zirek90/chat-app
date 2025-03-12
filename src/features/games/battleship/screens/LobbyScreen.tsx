import { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CountdownTimer, PlayerList, RoomControls } from '../components';
import { Player } from '../interface';
import { useLobbyStore } from '../store';
import { API } from '@/src/api/api';
import { COLORS } from '@/src/constants';

export function LobbyScreen() {
  const { players, updatePlayers, moveToNextPhase, togglePlayerReady, roomId, setRoomId } =
    useLobbyStore();
  const [inputRoomId, setInputRoomId] = useState('');
  const readyPlayers = useMemo(() => players.filter((player) => player.ready), [players]);

  function handleToggle(player: Player) {
    togglePlayerReady(player);
    API.game.sendReadySignal(roomId!, { ...player, ready: !player.ready });
  }

  return (
    <View style={styles.container}>
      <RoomControls
        roomId={roomId}
        inputRoomId={inputRoomId}
        setInputRoomId={setInputRoomId}
        setRoomId={setRoomId}
        updatePlayers={updatePlayers}
      />

      <PlayerList players={players} togglePlayerReady={handleToggle} />

      <CountdownTimer
        readyPlayers={readyPlayers}
        moveToNextPhase={moveToNextPhase}
        nextPhase="placement"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '70%',
    backgroundColor: COLORS.overlay,
    borderRadius: 10,
  },
});
