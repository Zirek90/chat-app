import { create } from "zustand";
import { ShipInterface } from "../interface";

interface BattleshipStore {
  grid: boolean[][];
  ships: ShipInterface[];
  remainingShips: number;
  markShip: (row: number, col: number) => void;
  unmarkShip: (row: number, col: number) => void;
}

export const useBattleshipStore = create<BattleshipStore>((set) => ({
  grid: Array(10)
    .fill(false)
    .map(() => Array(10).fill(false)),
  ships: [
    { id: "1", name: "Commander Bun", size: 4, amount: 1, placed: false, cells: [] },
    { id: "2", name: "Lieutenant Kun", size: 2, amount: 1, placed: false, cells: [] },
    { id: "3", name: "Servant Duck", size: 1, amount: 2, placed: false, cells: [] },
  ],
  remainingShips: 4,
  markShip: (row: number, col: number) => {
    set((state) => {
      const updatedGrid = [...state.grid];
      updatedGrid[row][col] = !updatedGrid[row][col];

      return {
        grid: updatedGrid,
      };
    });
  },

  unmarkShip: (row: number, col: number) => {
    set((state) => {
      const updatedGrid = [...state.grid];
      updatedGrid[row][col] = false;

      return {
        grid: updatedGrid,
      };
    });
  },
}));
