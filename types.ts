export type TileType = 'fire' | 'water' | 'earth' | 'air' | 'magic' | 'light';

export interface Tile {
  id: string;
  type: TileType;
  x: number;
  y: number;
  isMatched?: boolean;
  isSpecial?: boolean; // For future powerups
}

export type Grid = (Tile | null)[][];

export interface LevelConfig {
  id: string;
  moves: number;
  targetScore: number;
  layout?: number[][]; // 1 for tile, 0 for empty/obstacle
}

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export const GRID_SIZE = 8;
export const TILE_TYPES: TileType[] = ['fire', 'water', 'earth', 'air', 'magic', 'light'];
