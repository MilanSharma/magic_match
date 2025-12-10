import { Grid, GRID_SIZE, Tile, TILE_TYPES, TileType } from "@/types";

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const getRandomTileType = (): TileType => {
  return TILE_TYPES[Math.floor(Math.random() * TILE_TYPES.length)];
};

export const createGrid = (size: number = GRID_SIZE): Grid => {
  const grid: Grid = [];
  for (let y = 0; y < size; y++) {
    const row: (Tile | null)[] = [];
    for (let x = 0; x < size; x++) {
      let type = getRandomTileType();
      // Simple prevent initial matches logic
      while (
        (x >= 2 && row[x - 1]?.type === type && row[x - 2]?.type === type) ||
        (y >= 2 && grid[y - 1][x]?.type === type && grid[y - 2][x]?.type === type)
      ) {
        type = getRandomTileType();
      }
      row.push({
        id: generateId(),
        type,
        x,
        y,
      });
    }
    grid.push(row);
  }
  return grid;
};

export const findMatches = (grid: Grid): Tile[] => {
  const matches: Set<Tile> = new Set();
  const size = grid.length;

  // Horizontal matches
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size - 2; x++) {
      const tile1 = grid[y][x];
      const tile2 = grid[y][x + 1];
      const tile3 = grid[y][x + 2];

      if (tile1 && tile2 && tile3 && tile1.type === tile2.type && tile1.type === tile3.type) {
        matches.add(tile1);
        matches.add(tile2);
        matches.add(tile3);
      }
    }
  }

  // Vertical matches
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size - 2; y++) {
      const tile1 = grid[y][x];
      const tile2 = grid[y + 1][x];
      const tile3 = grid[y + 2][x];

      if (tile1 && tile2 && tile3 && tile1.type === tile2.type && tile1.type === tile3.type) {
        matches.add(tile1);
        matches.add(tile2);
        matches.add(tile3);
      }
    }
  }

  return Array.from(matches);
};

export const canSwap = (grid: Grid, x1: number, y1: number, x2: number, y2: number): boolean => {
  // Must be adjacent
  if (Math.abs(x1 - x2) + Math.abs(y1 - y2) !== 1) return false;
  
  // Clone grid to test swap
  const tempGrid = grid.map(row => [...row]);
  const tile1 = tempGrid[y1][x1];
  const tile2 = tempGrid[y2][x2];

  if (!tile1 || !tile2) return false;

  // Swap
  tempGrid[y1][x1] = { ...tile2, x: x1, y: y1 };
  tempGrid[y2][x2] = { ...tile1, x: x2, y: y2 };

  const matches = findMatches(tempGrid);
  return matches.length > 0;
};
