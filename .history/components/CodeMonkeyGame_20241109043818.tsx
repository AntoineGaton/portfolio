import { useState } from 'react';
import { GameState } from '../types/game';
import { scenes } from '../data/gameScenes';
import { Achievement } from '../types/game';

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
    },
    achievements: [],
    chapter: 1,
    decisions: {}
  });

  const checkAchievements = (state: GameState) => {
    achievements.forEach(achievement => {
      if (!state.achievements.includes(achievement.id) && achievement.condition(state)) {
        state.achievements.push(achievement.id);
        onGameOutput(`🏆 Achievement Unlocked: ${achievement.name}
${achievement.description}`);
      }
    });
  };

  const checkRequirements = (option: SceneOption): boolean => {
    if (!option.requirement) return true;

    if (option.requirement.stats) {
      for (const [stat, value] of Object.entries(option.requirement.stats)) {
        if (gameState.stats[stat] < value) {
          return false;
        }
      }
    }

    if (option.requirement.items) {
      for (const item of option.requirement.items) {
        if (!gameState.inventory.includes(item)) {
          return false;
        }
      }
    }

    return true;
  };

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
        // Check requirements
        if (!checkRequirements(option)) {
          return "You don't meet the requirements for this action yet.";
        }

        // Update game state
        setGameState(prev => {
          const newState = { 
            ...prev, 
            currentScene: option.nextScene,
            decisions: {
              ...prev.decisions,
              [prev.currentScene]: command
            }
          };
          
          if (option.statIncrease) {
            Object.entries(option.statIncrease).forEach(([stat, value]) => {
              newState.stats[stat] += value;
            });
          }
          
          if (option.itemGain) {
            newState.inventory = [...prev.inventory, ...option.itemGain];
          }

          // Check for achievements
          checkAchievements(newState);
          
          return newState;
        });

        return option.response;
      }
    }

    return "I don't understand that command. Try 'look' to see your options.";
  };

  return null;
} 