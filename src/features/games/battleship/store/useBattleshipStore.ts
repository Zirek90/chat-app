import { create } from 'zustand';
import { ShipInterface } from '../interface';

interface BattleshipStore {
  grid: (null | string)[][];
  ships: ShipInterface[];
  remainingShips: number;
  selectedShip: ShipInterface | null;
  setSelectedShip: (id: string | null) => void;
  isHorizontal: boolean;
  toggleRotation: () => void; //
  placeShip: (startRow: number, startCol: number) => void;
  unplaceShip: (id: string) => void;
  isValidPlacement: (
    startRow: number,
    startCol: number,
    size: number,
    isHorizontal: boolean,
  ) => boolean;
}

export const useBattleshipStore = create<BattleshipStore>((set, get) => ({
  grid: Array(10)
    .fill(null)
    .map(() => Array(10).fill(null)),
  ships: [
    { id: '1', name: 'Commander Bun', size: 4, placed: false, cells: [] },
    { id: '2', name: 'Lieutenant Kun', size: 2, placed: false, cells: [] },
    { id: '3', name: 'Servant Duck', size: 1, placed: false, cells: [] },
    { id: '4', name: 'Private Racoon', size: 1, placed: false, cells: [] },
  ],
  remainingShips: 4,
  selectedShipId: null,
  selectedShip: null,
  setSelectedShip: (id) =>
    set((state) => ({
      selectedShip: state.ships.find((ship) => ship.id === id) || null,
    })),
  isHorizontal: true,
  toggleRotation: () => set((state) => ({ isHorizontal: !state.isHorizontal })),
  isValidPlacement: (startRow, startCol, size, isHorizontal) => {
    const { grid } = get();

    for (let i = 0; i < size; i++) {
      const row = isHorizontal ? startRow : startRow + i;
      const col = isHorizontal ? startCol + i : startCol;

      if (row >= 10 || col >= 10 || grid[row][col]) return false;

      const directions = [
        [-1, -1], // Top-left,
        [-1, 0], // Top,
        [-1, 1], // Top-right
        [0, -1], // Left
        [0, 1], // Right
        [1, -1], // Bottom-left,
        [1, 0], //  Bottom,
        [1, 1], //, Bottom-right
      ];

      for (const [rowOffset, colOffset] of directions) {
        const adjacentRow = row + rowOffset;
        const adjacentCol = col + colOffset;

        if (
          adjacentRow >= 0 &&
          adjacentRow < 10 &&
          adjacentCol >= 0 &&
          adjacentCol < 10 &&
          grid[adjacentRow][adjacentCol]
        ) {
          return false;
        }
      }
    }
    return true;
  },
  placeShip: (startRow, startCol) => {
    set((state) => {
      const selectedShip = state.ships.find((ship) => ship.id === state.selectedShip?.id);
      if (!selectedShip || selectedShip.placed) return state;

      if (!state.isValidPlacement(startRow, startCol, selectedShip.size, state.isHorizontal)) {
        return state;
      }

      const newGrid = state.grid.map((row) => [...row]);
      const newCells: { row: number; col: number }[] = [];

      for (let i = 0; i < selectedShip.size; i++) {
        const row = state.isHorizontal ? startRow : startRow + i;
        const col = state.isHorizontal ? startCol + i : startCol;
        newGrid[row][col] = selectedShip.id;
        newCells.push({ row, col });
      }

      return {
        grid: newGrid,
        ships: state.ships.map((ship) =>
          ship.id === selectedShip.id ? { ...ship, placed: true, cells: newCells } : ship,
        ),
        selectedShipId: null,
        selectedShip: null,
        remainingShips: state.remainingShips - 1,
      };
    });
  },
  unplaceShip: (id) => {
    set((state) => {
      const selectedShip = state.ships.find((ship) => ship.id === id);
      if (!selectedShip || !selectedShip.placed) return state;

      const newGrid = state.grid.map((row) => row.map((cell) => (cell === id ? null : cell)));

      return {
        grid: newGrid,
        ships: state.ships.map((ship) =>
          ship.id === id ? { ...ship, placed: false, cells: [] } : ship,
        ),
        remainingShips: state.remainingShips + 1,
      };
    });
  },
}));
