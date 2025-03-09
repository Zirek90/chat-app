import { create } from 'zustand';
import { Player } from '../interface';
import { GamePhaseType } from '../types';

interface LobbyStore {
  players: Player[];
  roomId: string | null;
  gamePhase: GamePhaseType;
  shipsPlaced: Record<string, boolean>;

  setRoomId: (roomId: string) => void;
  updatePlayers: (player: Player) => void;
  togglePlayerReady: (player: Player) => void;
  moveToNextPhase: (phase: GamePhaseType) => void;
  markShipsPlaced: (id: string) => void;
}

export const useLobbyStore = create<LobbyStore>((set) => ({
  players: [],
  readyPlayers: [],
  gamePhase: 'lobby',
  shipsPlaced: {},
  roomId: null,

  setRoomId: (roomId) => set({ roomId }),
  updatePlayers: (player: Player) =>
    set((state) => {
      const existingPlayerIndex = state.players.findIndex(
        (existingPlayer) => existingPlayer.id === player.id,
      );

      if (existingPlayerIndex !== -1) {
        const updatedPlayers = [...state.players];
        updatedPlayers[existingPlayerIndex] = player;
        return {
          players: updatedPlayers,
        };
      } else {
        return {
          players: [...state.players, player],
        };
      }
    }),
  togglePlayerReady: (player) =>
    set((state) => {
      const updatedPlayers = state.players.map((p) =>
        p.id === player.id ? { ...player, ready: !p.ready } : p,
      );

      const updatedReadyPlayers = updatedPlayers.filter((p) => p.ready).map((p) => p.id);

      return { players: updatedPlayers, readyPlayers: updatedReadyPlayers };
    }),
  moveToNextPhase: (gamePhase) => set({ gamePhase }),
  markShipsPlaced: (id) =>
    set((state) => {
      const updatedShipsPlaced = { ...state.shipsPlaced, [id]: true };
      const allPlaced = state.players.every((p) => updatedShipsPlaced[p.id]);

      return {
        shipsPlaced: updatedShipsPlaced,
        gamePhase: allPlaced ? 'battle' : state.gamePhase,
      };
    }),
}));
