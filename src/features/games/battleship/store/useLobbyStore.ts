import { create } from 'zustand';
import { Player } from '../interface';
import { GamePhaseType } from '../types';

interface LobbyStore {
  players: Player[];
  shipsPlaced: { [key: string]: boolean };
  moveToNextPhase: (phase: GamePhaseType) => void;
  setPlayers: (player: Player[]) => void;
  toggleReady: (id: string) => void;
  gamePhase: GamePhaseType;
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
}));
