export interface ShipInterface {
  id: string;
  name: string;
  amount: number;
  size: number;
  placed: boolean;
  cells: { x: number; y: number }[];
}
