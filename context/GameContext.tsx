import createContextHook from '@nkzw/create-context-hook';
import { useState, useCallback, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { Grid, GRID_SIZE, GameStatus } from '@/types';
import { createGrid, findMatches, canSwap, generateId, getRandomTileType } from '@/utils/gameLogic';

export const [GameContext, useGame] = createContextHook(() => {
  const [grid, setGrid] = useState<Grid>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [targetScore, setTargetScore] = useState(1000);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [level, setLevel] = useState(1);

  const startGame = useCallback((levelId: number) => {
    const newGrid = createGrid();
    setGrid(newGrid);
    setScore(0);
    setMoves(20); // Default moves
    setTargetScore(levelId * 1000 + 500);
    setStatus('playing');
    setLevel(levelId);
  }, []);

  const handleMatches = useCallback(async (currentGrid: Grid) => {
    let loopGrid = currentGrid.map(row => [...row]);
    let hasMatches = true;
    let totalScoreToAdd = 0;

    // Simple loop to resolve matches
    // In a real game, this would be step-by-step with animations
    // Here we resolve it in one go for state, but UI might lag behind
    
    // We limit iterations to prevent infinite loops
    let iterations = 0;
    while (hasMatches && iterations < 5) {
      const matches = findMatches(loopGrid);
      if (matches.length === 0) {
        hasMatches = false;
        break;
      }

      // Add score
      totalScoreToAdd += matches.length * 100;
      
      // Remove matches
      matches.forEach(tile => {
        loopGrid[tile.y][tile.x] = null;
      });

      // Drop tiles
      for (let x = 0; x < GRID_SIZE; x++) {
        let emptySlots = 0;
        for (let y = GRID_SIZE - 1; y >= 0; y--) {
          if (loopGrid[y][x] === null) {
            emptySlots++;
          } else if (emptySlots > 0) {
            // Move tile down
            loopGrid[y + emptySlots][x] = { ...loopGrid[y][x]!, y: y + emptySlots };
            loopGrid[y][x] = null;
          }
        }
        
        // Fill top
        for (let y = 0; y < emptySlots; y++) {
          loopGrid[y][x] = {
            id: generateId(),
            type: getRandomTileType(),
            x,
            y
          };
        }
      }
      
      iterations++;
    }

    if (totalScoreToAdd > 0) {
       setScore(prev => prev + totalScoreToAdd);
       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    setGrid(loopGrid);
  }, []);

  const swapTiles = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    if (status !== 'playing') return;

    if (canSwap(grid, x1, y1, x2, y2)) {
      const newGrid = grid.map(row => [...row]);
      const tile1 = newGrid[y1][x1];
      const tile2 = newGrid[y2][x2];

      if (!tile1 || !tile2) return;

      // Swap logic
      newGrid[y1][x1] = { ...tile2, x: x1, y: y1 };
      newGrid[y2][x2] = { ...tile1, x: x2, y: y2 };

      setGrid(newGrid);
      setMoves(prev => prev - 1);
      Haptics.selectionAsync();

      // Check matches after swap
      handleMatches(newGrid);
    } else {
      // Invalid swap
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [grid, status, handleMatches]);

  useEffect(() => {
    if (status === 'playing') {
      if (score >= targetScore) {
        setStatus('won');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (moves <= 0) {
        setStatus('lost');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  }, [score, moves, targetScore, status]);

  return {
    grid,
    score,
    moves,
    status,
    level,
    startGame,
    swapTiles
  };
});
