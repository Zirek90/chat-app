import { create } from 'zustand';
import { getSymbol } from '../utils';

interface BattleState {
  isMyTurn: boolean;
  ourGrid: (null | string)[][];
  opponentGrid: (null | string)[][];
  selectedAttack: { row: number; col: number } | null;
  toggleTurn: () => void;
  updateOurGrid: (grid: (null | string)[][]) => void;
  updateOpponentGrid: (grid: (null | string)[][]) => void;
  markAttack: (row: number, col: number) => void;
  confirmAttack: () => void;
  getCellDisplay: (row: number, col: number) => string | null;
}

export const useBattleStore = create<BattleState>((set, get) => ({
  isMyTurn: true,
  ourGrid: Array(10)
    .fill(null)
    .map(() => Array(10).fill(null)),
  opponentGrid: Array(10)
    .fill(null)
    .map(() => Array(10).fill(null)),
  selectedAttack: null,

  toggleTurn: () => set((state) => ({ isMyTurn: !state.isMyTurn })),
  updateOurGrid: (grid) => set(() => ({ ourGrid: grid })),
  updateOpponentGrid: (grid) => set(() => ({ opponentGrid: grid })),
  markAttack: (row, col) => {
    set((state) => {
      if (!state.isMyTurn) return state;
      return { selectedAttack: { row, col } };
    });
  },
  confirmAttack: () => {
    set((state) => {
      if (!state.selectedAttack) return state;

      const { row, col } = state.selectedAttack;
      const isHit = state.opponentGrid[row][col] !== null;

      const newGrid = state.opponentGrid.map((r, rowIndex) =>
        r.map((cell, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            return isHit ? 'hit' : 'miss';
          }
          return cell;
        }),
      );

      return {
        opponentGrid: newGrid,
        selectedAttack: null,
        isMyTurn: false,
      };
    });
  },
  getCellDisplay: (row, col) => {
    const { opponentGrid } = get();
    return getSymbol(opponentGrid[row][col]);
  },
}));
