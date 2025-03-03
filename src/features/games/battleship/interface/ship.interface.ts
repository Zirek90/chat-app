export interface ShipInterface {
  id: string;
  name: string;
  size: number;
  placed: boolean;
  cells: { row: number; col: number }[];
}
