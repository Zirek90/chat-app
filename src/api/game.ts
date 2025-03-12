import { Platform } from 'react-native';
import { GameEvent } from '../features/games/battleship/enums';
import {
  Player,
  PlayerReadyPayload,
  PlayerJoinedPayload,
  PlayerListUpdatePayload,
  AllShipsPlacedPayload,
  ShipsPlacedPayload,
} from '../features/games/battleship/interface';
import { useLobbyStore } from '../features/games/battleship/store';
import { supabase } from '../libs/supabase';

export const GameAPI = {
  joinGameRoom: (roomId: string, playerId: string, name: string) => {
    const channel = supabase.channel(roomId).subscribe();

    channel.send({
      type: 'broadcast',
      event: GameEvent.PLAYER_JOINED,
      payload: { id: playerId, name },
    });

    channel.send({
      type: 'broadcast',
      event: GameEvent.PLAYER_LIST_REQUEST,
      payload: { requesterId: playerId },
    });
  },
  sendReadySignal: (roomId: string, player: Player) => {
    supabase.channel(roomId).send({
      type: 'broadcast',
      event: GameEvent.PLAYER_READY,
      payload: { ...player },
    });
  },
  sendShipsPlaced: (roomId: string, playerId: string, name: string, grid: string[][]) => {
    supabase.channel(roomId).send({
      type: 'broadcast',
      event: GameEvent.SHIPS_PLACED,
      payload: { id: playerId, name, grid },
    });
  },
  sendAllShipsPlaced: (roomId: string) => {
    supabase.channel(roomId).send({
      type: 'broadcast',
      event: GameEvent.ALL_SHIPS_PLACED,
    });
  },
  subscribeBattleshipGameEvents: (
    roomId: string,
    eventHandler: (
      event: GameEvent,
      payload:
        | PlayerReadyPayload
        | PlayerJoinedPayload
        | PlayerListUpdatePayload
        | ShipsPlacedPayload
        | AllShipsPlacedPayload,
    ) => void,
  ) => {
    const channel = supabase.channel(roomId);
    channel
      .on('broadcast', { event: GameEvent.PLAYER_READY }, (message) => {
        const { event, payload } = message;
        eventHandler(event as GameEvent, payload as PlayerReadyPayload);
      })
      .on('broadcast', { event: GameEvent.PLAYER_JOINED }, (message) => {
        const { event, payload } = message;
        eventHandler(event as GameEvent, payload as PlayerJoinedPayload);
      })
      .on('broadcast', { event: GameEvent.PLAYER_LIST_REQUEST }, () => {
        console.log('broadcast PLAYER_LIST_REQUEST', Platform.OS);
        // const players = useLobbyStore.getState().players;
        // console.log({ players });
        // setTimeout(() => {
        //   channel.send({
        //     type: 'broadcast',
        //     event: GameEvent.PLAYER_LIST_SYNC,
        //     payload: { players },
        //   });
        // }, 500); //  delay to let data sync
      })
      .on('broadcast', { event: GameEvent.PLAYER_LIST_SYNC }, (message) => {
        console.log('broadcast PLAYER_LIST_SYNC', Platform.OS);

        eventHandler(message.event as GameEvent, message.payload as PlayerListUpdatePayload);
      })
      .on('broadcast', { event: GameEvent.SHIPS_PLACED }, (message) => {
        eventHandler(message.event as GameEvent, message.payload);
        const players = useLobbyStore.getState().players;
        const placedPlayers = players.filter((player) => player.shipsPlaced);

        if (placedPlayers.length === 2) {
          setTimeout(() => {
            channel.send({
              type: 'broadcast',
              event: GameEvent.ALL_SHIPS_PLACED,
              payload: { players },
            });
          }, 500); //  delay to let data sync
        }
      })
      .on('broadcast', { event: GameEvent.ALL_SHIPS_PLACED }, (message) => {
        eventHandler(message.event as GameEvent, message.payload);
      });

    return channel;
  },
};
