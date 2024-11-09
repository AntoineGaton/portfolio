import { useState } from 'react';
import { GameState } from '../types/game';

interface CodeMonkeyGameProps {
  onGameEnd: () => void;
  onGameOutput: (output: string) => void;
}

export function CodeMonkeyGame({ onGameEnd, onGameOutput }: CodeMonkeyGameProps) {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'intro',
    inventory: [],
    stats: {
      coding: 1,
      creativity: 1,
      resilience: 1,
    }
  });

  const processGameCommand = (input: string): string => {
    const command = input.toLowerCase().trim();

    if (command === 'quit') {
      onGameEnd();
      return 'Thanks for playing!';
    }

    if (command === 'stats') {
      return `Your Stats:
Coding: ${gameState.stats.coding}
Creativity: ${gameState.stats.creativity}
Resilience: ${gameState.stats.resilience}`;
    }

    if (command === 'inventory') {
      return gameState.inventory.length > 0 
        ? `Your inventory: ${gameState.inventory.join(', ')}` 
        : 'Your inventory is empty';
    }

    // ... rest of the game logic from before ...
  };

  return null; // This is a logic-only component
} 