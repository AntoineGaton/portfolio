import { GameState } from '../types/game';

export interface SceneOption {
  triggers: string[];
  nextScene: string;
  statIncrease?: Partial<Record<'coding' | 'creativity' | 'resilience', number>>;
  itemGain?: string[];
  response: string;
  requirement?: {
    stats?: Partial<Record<'coding' | 'creativity' | 'resilience', number>>;
    items?: string[];
  };
}

export interface Scene {
  look: string;
  options: Record<string, SceneOption>;
}

export const scenes: Record<string, Scene> = {
  intro: {
    look: `The Bronx, NY - 1990s

You find yourself in your childhood bedroom, surrounded by comics, books, and the soft glow of an old computer monitor. The streets outside are busy with the usual sounds of the city, but in here, you've created your own sanctuary.

Options:
1) Explore the computer
2) Read some comics
3) Look out the window`,
    
    options: {
      computer: {
        triggers: ['1', 'explore computer', 'computer'],
        nextScene: 'computer',
        statIncrease: { coding: 1 },
        response: `You sit down at the old computer, its fan humming quietly. The screen flickers to life, showing a basic DOS prompt. Something about it captivates you...

Your coding skill increased!`
      },
      comics: {
        triggers: ['2', 'read comics', 'comics'],
        nextScene: 'comics',
        statIncrease: { creativity: 1 },
        response: `You pick up some of your favorite comics. The pages are worn from countless readings, but the stories still captivate you.

Your creativity increased!`
      },
      window: {
        triggers: ['3', 'window', 'look window'],
        nextScene: 'window',
        statIncrease: { resilience: 1 },
        response: `The bustling streets of the Bronx stretch out before you. Life isn't always easy here, but there's a vibrant energy that can't be denied.

Your resilience increased!`
      }
    }
  },

  // Act 2: Discovering Programming
  learning_python: {
    look: `You've discovered Python, and it feels different from anything you've tried before. The syntax is clean, readable, and powerful.

Options:
1) Start a small project
2) Follow online tutorials
3) Join a coding community`,
    
    options: {
      project: {
        triggers: ['1', 'project', 'start project'],
        nextScene: 'first_project',
        statIncrease: { coding: 2 },
        response: `You start a small project in Python. It's challenging, but the syntax is clean and readable.

Your coding skill increased!`
      },
      tutorials: {
        triggers: ['2', 'follow tutorials', 'tutorials'],
        nextScene: 'tutorials',
        statIncrease: { coding: 1 },
        response: `You follow some online tutorials. They're informative and help you understand Python better.

Your coding skill increased!`
      },
      community: {
        triggers: ['3', 'join community', 'community'],
        nextScene: 'community',
        statIncrease: { coding: 1 },
        response: `You join a coding community. They're helpful and you learn a lot from them.

Your coding skill increased!`
      }
    }
  },

  // ... (I'll continue with the full scene list in the next message due to length)
}; 