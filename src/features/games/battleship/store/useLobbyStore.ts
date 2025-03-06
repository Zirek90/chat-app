import { create } from 'zustand';
import { Player } from '../interface';
import { GamePhaseType } from '../types';

interface LobbyStore {
  players: Player[];
  shipsPlaced: { [key: string]: boolean };
  gamePhase: GamePhaseType;
  setPlayers: (player: Player[]) => void;
  toggleReady: (id: string) => void;
  moveToNextPhase: (phase: GamePhaseType) => void;
  markShipsPlaced: (id: string) => void;
}

export const useLobbyStore = create<LobbyStore>((set, get) => ({
  players: [],
  gamePhase: 'lobby',
  shipsPlaced: {},

  setPlayers: (players) => set({ players }),
  toggleReady: (id) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === id ? { ...player, ready: !player.ready } : player,
      ),
    })),
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
