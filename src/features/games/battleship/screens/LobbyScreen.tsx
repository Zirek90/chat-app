import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PlayerList } from '../components/player-list';
import { RoomControls } from '../components/room-controls';
import { StartGameButton } from '../components/start-game-button';
import { GameEvent } from '../enums';
import { Player } from '../interface';
import {
  PlayerReadyPayload,
  PlayerJoinedPayload,
  PlayerListUpdatePayload,
} from '../interface/game-payload.interface';
import { useLobbyStore } from '../store';
import { API } from '@/src/api/api';
import { useUserQuery } from '@/src/api/queries';
import { COLORS } from '@/src/constants';

export function LobbyScreen() {
  const { data: user } = useUserQuery();
  const { players, updatePlayers, moveToNextPhase, togglePlayerReady, roomId, setRoomId } =
    useLobbyStore();
  const [inputRoomId, setInputRoomId] = useState('');

  const handleRoomEvent = useCallback(
    (
      event: GameEvent,
      payload: PlayerReadyPayload | PlayerJoinedPayload | PlayerListUpdatePayload,
    ) => {
      switch (event) {
        case GameEvent.PLAYER_READY:
          const { id: readyId, name: readyName } = payload as PlayerReadyPayload;

          updatePlayers({ id: readyId, name: readyName, ready: true });
          break;
        case GameEvent.PLAYER_JOINED:
          const { id: joinedId, name: joinedName } = payload as PlayerJoinedPayload;

          updatePlayers({ id: joinedId, name: joinedName, ready: false });
          break;
        case GameEvent.PLAYER_LIST_SYNC:
          const { players } = payload as PlayerListUpdatePayload;

          players.forEach(updatePlayers);
          break;
        default:
          console.warn('Unknown event received:', event);
      }
    },
    [updatePlayers],
  );

  useEffect(() => {
    if (!roomId || !user) return;

    const battleshipEvents = API.game.subscribeBattleshipGameEvents(roomId, handleRoomEvent);

    return () => {
      battleshipEvents.unsubscribe().catch((err) => console.error('Error unsubscribing:', err));
    };
  }, [roomId, handleRoomEvent, players, user]);

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

      <StartGameButton players={players} moveToNextPhase={moveToNextPhase} />
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
