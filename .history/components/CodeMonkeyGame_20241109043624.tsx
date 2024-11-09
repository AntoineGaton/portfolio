import { useState } from 'react';
import { GameState } from '../types/game';
import { scenes } from '../data/gameScenes';

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

    // Handle system commands
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

    // Handle scene-specific commands
    const currentScene = scenes[gameState.currentScene];
    if (!currentScene) {
      return "Error: Scene not found";
    }

    if (command === 'look') {
      return currentScene.look;
    }

    // Check for matching options in current scene
    for (const [_, option] of Object.entries(currentScene.options)) {
      if (option.triggers.includes(command)) {
        // Update game state
        setGameState(prev => {
          const newState = { ...prev, currentScene: option.nextScene };
          
          // Update stats if specified
          if (option.statIncrease) {
            Object.entries(option.statIncrease).forEach(([stat, value]) => {
              newState.stats[stat] += value;
            });
          }
          
          // Add items if specified
          if (option.itemGain) {
            newState.inventory = [...prev.inventory, ...option.itemGain];
          }
          
          return newState;
        });

        return option.response;
      }
    }

    return "I don't understand that command. Try 'look' to see your options.";
  };

  return null; // This is a logic-only component
} 