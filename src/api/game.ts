import { GameEvent } from '../features/games/battleship/enums';
import { Player } from '../features/games/battleship/interface';
import {
  PlayerReadyPayload,
  PlayerJoinedPayload,
  PlayerListUpdatePayload,
} from '../features/games/battleship/interface/game-payload.interface';
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

    return channel;
  },
  sendReadySignal: (roomId: string, player: Player) => {
    supabase.channel(roomId).send({
      type: 'broadcast',
      event: GameEvent.PLAYER_READY,
      payload: { ...player },
    });
  },
  subscribeBattleshipGameEvents: (
    roomId: string,
    eventHandler: (
      event: GameEvent,
      payload: PlayerReadyPayload | PlayerJoinedPayload | PlayerListUpdatePayload,
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
        const players = useLobbyStore.getState().players;
        if (players.length > 0) {
          setTimeout(() => {
            channel.send({
              type: 'broadcast',
              event: GameEvent.PLAYER_LIST_SYNC,
              payload: { players },
            });
          }, 500); //  delay to let data sync
        }
      })
      .on('broadcast', { event: GameEvent.PLAYER_LIST_SYNC }, (message) => {
        eventHandler(message.event as GameEvent, message.payload as PlayerListUpdatePayload);
      });

    return channel;
  },
};
