import { CellInterface } from './cell.interface';

export interface ShipInterface {
  id: string;
  name: string;
  size: number;
  placed: boolean;
  cells: CellInterface[];
}
