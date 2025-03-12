import { useCallback, useEffect } from 'react';
import { GameEvent } from './enums';
import {
  PlayerReadyPayload,
  PlayerJoinedPayload,
  PlayerListUpdatePayload,
  ShipsPlacedPayload,
  AllShipsPlacedPayload,
} from './interface';
import { BattleScreen, LobbyScreen, PlacementScreen } from './screens';
import { useLobbyStore } from './store';
import { useBattleStore } from './store/useBattleStore';
import { API } from '@/src/api/api';
import { useUserQuery } from '@/src/api/queries';

export function Battleship() {
  const { data: user } = useUserQuery();
  const { gamePhase, roomId, updatePlayers, markShipsPlaced, moveToNextPhase } = useLobbyStore();

  const handleRoomEvent = useCallback(
    (
      event: GameEvent,
      payload:
        | PlayerReadyPayload
        | PlayerJoinedPayload
        | PlayerListUpdatePayload
        | ShipsPlacedPayload
        | AllShipsPlacedPayload,
    ) => {
      console.log({ event });
      switch (event) {
        case GameEvent.PLAYER_READY: {
          const { id: readyId, name: readyName } = payload as PlayerReadyPayload;
          updatePlayers({ id: readyId, name: readyName, ready: true });
          break;
        }
        case GameEvent.PLAYER_JOINED: {
          const { id: joinedId, name: joinedName } = payload as PlayerJoinedPayload;
          updatePlayers({ id: joinedId, name: joinedName, ready: false });
          break;
        }
        case GameEvent.PLAYER_LIST_SYNC: {
          console.log('PLAYER_LIST_SYNC');
          const { players } = payload as PlayerListUpdatePayload;
          players.forEach(updatePlayers);
          break;
        }
        case GameEvent.SHIPS_PLACED: {
          const { id: playerId, grid } = payload as ShipsPlacedPayload;
          const { players } = useLobbyStore.getState();
          players.forEach((player) => {
            updatePlayers({ ...player, shipsPlaced: true, grid: grid });
          });
          markShipsPlaced(playerId);
          break;
        }
        case GameEvent.ALL_SHIPS_PLACED: {
          const { players } = payload as AllShipsPlacedPayload;
          console.log({ players });

          const ourPlayer = players.find((player) => player.id === user!.id);
          const opponentPlayer = players.find((player) => player.id !== user!.id);

          if (ourPlayer && opponentPlayer) {
            useBattleStore.getState().updateOurGrid(ourPlayer.grid || []);
            useBattleStore.getState().updateOpponentGrid(opponentPlayer.grid || []);
          }
          moveToNextPhase('battle');
          break;
        }
        default:
          console.warn('Unknown event received:', event);
      }
    },
    [updatePlayers, markShipsPlaced, moveToNextPhase, user],
  );

  useEffect(() => {
    if (!roomId || !user) return;

    const battleshipEvents = API.game.subscribeBattleshipGameEvents(roomId, handleRoomEvent);
    return () => {
      battleshipEvents.unsubscribe().catch((err) => console.error('Error unsubscribing:', err));
    };
  }, [roomId, handleRoomEvent, user]);

  if (gamePhase === 'lobby') return <LobbyScreen />;
  if (gamePhase === 'placement') return <PlacementScreen />;
  return <BattleScreen />;
}
