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
        statIncrease: { coding: 2, creativity: 1 },
        itemGain: ['First Python Project'],
        requirement: { stats: { coding: 3 } },
        response: `You decide to create a simple airline reservation system. It's challenging, but you're learning so much.

Your coding and creativity increased!
You gained: First Python Project`
      },
      tutorials: {
        triggers: ['2', 'tutorials', 'online'],
        nextScene: 'tutorials',
        statIncrease: { coding: 1 },
        response: `You spend hours following tutorials, building your foundation in programming concepts.

Your coding increased!`
      },
      community: {
        triggers: ['3', 'community', 'join'],
        nextScene: 'coding_community',
        statIncrease: { resilience: 1, creativity: 1 },
        itemGain: ['Community Badge'],
        response: `You join an online programming community. The support and shared knowledge are invaluable.

Your resilience and creativity increased!
You gained: Community Badge`
      }
    }
  },

  // Act 3: College and Career Growth
  college_start: {
    look: `You're at Colorado Technical University, balancing studies with work. The path ahead is challenging but promising.

Options:
1) Focus on coursework
2) Work on side projects
3) Apply for internships`,
    
    options: {
      coursework: {
        triggers: ['1', 'coursework', 'study'],
        nextScene: 'studying',
        statIncrease: { coding: 2 },
        requirement: { stats: { resilience: 4 } },
        response: `You dedicate yourself to your studies, mastering new concepts and technologies.

Your coding increased significantly!`
      },
      projects: {
        triggers: ['2', 'projects', 'side projects'],
        nextScene: 'portfolio_building',
        statIncrease: { coding: 1, creativity: 2 },
        itemGain: ['Portfolio Project'],
        response: `You spend extra time building projects for your portfolio, showcasing your skills.

Your coding and creativity increased!
You gained: Portfolio Project`
      },
      internships: {
        triggers: ['3', 'internships', 'apply'],
        nextScene: 'job_search',
        statIncrease: { resilience: 2 },
        requirement: { items: ['Portfolio Project'] },
        response: `You start applying for internships, facing both rejections and opportunities.

Your resilience increased significantly!`
      }
    }
  },

  // Act 4: Side Hustle and Code Monkey Studios
  code_monkey_studios: {
    look: `You've decided to launch Code Monkey Studios alongside your regular work. It's a big step, but you're ready.

Options:
1) Work on Bianca's App
2) Redesign Feel Good Studios
3) Learn new technologies`,
    
    options: {
      bianca_app: {
        triggers: ['1', 'bianca', 'app'],
  // ... (I'll continue with the full scene list in the next message due to length)
}; 