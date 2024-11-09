export interface SceneOption {
  triggers: string[];
  nextScene: string;
  statIncrease?: Partial<Record<'coding' | 'creativity' | 'resilience', number>>;
  itemGain?: string[];
  response: string;
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

  computer: {
    look: `The computer screen glows with possibility. You've spent countless hours here, learning and experimenting.

Options:
1) Try typing some commands
2) Look through old programs
3) Return to room`,
    
    options: {
      commands: {
        triggers: ['1', 'type', 'commands'],
        nextScene: 'coding',
        statIncrease: { coding: 1 },
        itemGain: ['Basic Programming Manual'],
        response: `You start typing commands, learning the basics of DOS. Something clicks in your mind - this feels right.

You found: Basic Programming Manual
Your coding skill increased!`
      },
      programs: {
        triggers: ['2', 'look programs', 'programs'],
        nextScene: 'programs',
        itemGain: ['Old Game Floppy'],
        response: `You find some old programs, including a few games on floppy disks. One catches your eye...

You found: Old Game Floppy`
      },
      return: {
        triggers: ['3', 'return', 'back'],
        nextScene: 'intro',
        response: 'You step away from the computer, returning to your room.'
      }
    }
  },

  coding: {
    look: `The DOS prompt blinks steadily, waiting for your input.

Options:
1) Practice BASIC programming
2) Read the manual
3) Return to computer`,
    
    options: {
      practice: {
        triggers: ['1', 'practice', 'basic'],
        nextScene: 'coding_practice',
        statIncrease: { coding: 2 },
        itemGain: ['First Program'],
        response: `You spend hours typing simple programs, learning about variables and loops.

You created: First Program
Your coding skill increased significantly!`
      },
      manual: {
        triggers: ['2', 'read', 'manual'],
        nextScene: 'reading',
        statIncrease: { coding: 1, creativity: 1 },
        response: `The manual is dense but fascinating. You learn about the fundamentals of programming.

Both your coding and creativity increased!`
      },
      return: {
        triggers: ['3', 'return', 'back'],
        nextScene: 'computer',
        response: 'You take a break from coding.'
      }
    }
  }
  // ... more scenes to be added
}; 