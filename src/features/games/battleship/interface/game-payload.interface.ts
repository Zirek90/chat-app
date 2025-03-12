import { Player } from './player.interface';

export interface PlayerReadyPayload {
  id: string;
  name: string;
  ready: boolean;
}

export interface PlayerJoinedPayload {
  id: string;
  name: string;
}

export interface PlayerListUpdatePayload {
  players: Player[];
}

export interface ShipsPlacedPayload {
  grid: string[][];
  id: string;
  name: string;
}

export interface AllShipsPlacedPayload {
  players: {
    grid: string[][];
    id: string;
    name: string;
    ready: boolean;
    shipsPlaced: boolean;
  }[];
}
