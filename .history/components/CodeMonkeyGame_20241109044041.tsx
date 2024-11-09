import { useState, useEffect } from 'react';
import { GameState, GameSave } from '../types/game';
import { scenes } from '../data/gameScenes';
import { hints } from '../data/gameHints';
import { quests } from '../data/gameQuests';
import { achievements } from '../data/gameAchievements';
import { SceneOption } from '../data/gameScenes';

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

  const [activeQuests, setActiveQuests] = useState<string[]>([]);
  const [lastSave, setLastSave] = useState<number | null>(null);

  // Save/Load functions
  const saveGame = (description: string = 'Quick Save') => {
    const save: GameSave = {
      timestamp: Date.now(),
      state: gameState,
      description
    };
    localStorage.setItem(`codemonkey_save_${save.timestamp}`, JSON.stringify(save));
    setLastSave(save.timestamp);
    return `Game saved: ${description}`;
  };

  const loadGame = (timestamp: number) => {
    const saveData = localStorage.getItem(`codemonkey_save_${timestamp}`);
    if (saveData) {
      const save: GameSave = JSON.parse(saveData);
      setGameState(save.state);
      return `Game loaded: ${save.description}`;
    }
    return 'Save file not found';
  };

  const listSaves = () => {
    const saves: GameSave[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('codemonkey_save_')) {
        saves.push(JSON.parse(localStorage.getItem(key)!));
      }
    }
    return saves.sort((a, b) => b.timestamp - a.timestamp);
  };

  // Hint system
  const checkForHints = (state: GameState) => {
    const currentHints = hints.filter(hint => 
      hint.sceneId === state.currentScene && 
      hint.condition(state)
    );
    
    if (currentHints.length > 0) {
      onGameOutput(`💡 ${currentHints[0].text}`);
    }
  };

  // Quest system
  const checkQuests = (state: GameState) => {
    quests.forEach(quest => {
      if (activeQuests.includes(quest.id) && quest.isComplete(state)) {
        setActiveQuests(prev => prev.filter(id => id !== quest.id));
        
        // Apply rewards
        if (quest.reward) {
          setGameState(prev => {
            const newState = { ...prev };
            if (quest.reward?.stats) {
              Object.entries(quest.reward.stats).forEach(([stat, value]) => {
                newState.stats[stat] += value;
              });
            }
            if (quest.reward?.items) {
              newState.inventory = [...prev.inventory, ...quest.reward.items];
            }
            return newState;
          });
        }

        onGameOutput(`🎯 Quest Complete: ${quest.title}
${quest.description}
Rewards have been added to your inventory!`);
      }
    });
  };

  // Auto-save feature
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      saveGame('Auto Save');
    }, 300000); // Auto-save every 5 minutes

    return () => clearInterval(autoSaveInterval);
  }, [gameState]);

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

    // Add new system commands
    switch (command) {
      case 'save':
        return saveGame('Manual Save');
      
      case 'load':
        if (lastSave) {
          return loadGame(lastSave);
        }
        return 'No save file found';
      
      case 'saves':
        const saves = listSaves();
        return saves.length > 0 
          ? saves.map(save => 
              `${new Date(save.timestamp).toLocaleString()}: ${save.description}`
            ).join('\n')
          : 'No saves found';
      
      case 'quests':
        return activeQuests.length > 0
          ? quests
              .filter(quest => activeQuests.includes(quest.id))
              .map(quest => `${quest.title}: ${quest.description}`)
              .join('\n')
          : 'No active quests';
      
      case 'hint':
        const currentHints = hints.filter(hint => 
          hint.sceneId === gameState.currentScene && 
          hint.condition(gameState)
        );
        return currentHints.length > 0
          ? currentHints[0].text
          : 'No hint available';
    }

    return "I don't understand that command. Try 'look' to see your options.";
  };

  return null;
} 