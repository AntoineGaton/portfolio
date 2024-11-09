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
        nextScene: 'pet_app_development',
        statIncrease: { coding: 2, creativity: 2 },
        requirement: { stats: { coding: 7 } },
        itemGain: ['AI Assistant Project'],
        response: `You take on the challenge of developing an AI-powered pet services app.

Your coding and creativity increased significantly!
You gained: AI Assistant Project`
      },
      redesign: {
        triggers: ['2', 'redesign', 'feel good'],
        nextScene: 'client_work',
        statIncrease: { creativity: 2, resilience: 1 },
        itemGain: ['Client Portfolio'],
        response: `You work on redesigning the Feel Good Studios website, handling client communications and deliverables.

Your creativity and resilience increased!
You gained: Client Portfolio`
      },
      learn: {
        triggers: ['3', 'learn', 'technologies'],
        nextScene: 'skill_building',
        statIncrease: { coding: 1, creativity: 1, resilience: 1 },
        response: `You invest time in learning new frameworks and tools, expanding your skillset.

All your stats increased!`
      }
    }
  },

  // Act 5: The Dream Job
  final_interview: {
    look: `This is it - the interview for your dream job. Your portfolio is ready, and your experience has prepared you for this moment.

Options:
1) Present your portfolio
2) Discuss technical challenges
3) Share your journey`,
    
    options: {
      portfolio: {
        triggers: ['1', 'portfolio', 'present'],
        nextScene: 'success',
        statIncrease: { creativity: 2 },
        requirement: { 
          stats: { coding: 8, creativity: 6 },
          items: ['AI Assistant Project', 'Client Portfolio']
        },
        response: `You confidently present your portfolio, showcasing the projects that represent your growth and skills.

Your creativity increased!
Achievement Unlocked: Dream Job Secured!`
      },
      technical: {
        triggers: ['2', 'technical', 'challenges'],
        nextScene: 'success',
        statIncrease: { coding: 2 },
        requirement: { stats: { coding: 9, resilience: 7 } },
        response: `You navigate the technical discussion with expertise, drawing from your years of experience.

Your coding increased!
Achievement Unlocked: Technical Excellence!`
      },
      journey: {
        triggers: ['3', 'journey', 'share'],
        nextScene: 'success',
        statIncrease: { resilience: 2 },
        requirement: { stats: { resilience: 8, creativity: 7 } },
        response: `You share your inspiring journey from the Bronx to becoming a developer, showing your determination and growth.

Your resilience increased!
Achievement Unlocked: Inspiring Story!`
      }
    }
  }
};

export const achievements: Achievement[] = [
  {
    id: 'first_code',
    name: 'Hello, World!',
    description: 'Write your first program',
    condition: (state) => state.inventory.includes('First Python Project')
  },
  {
    id: 'entrepreneur',
    name: 'Code Monkey Rising',
    description: 'Launch Code Monkey Studios',
    condition: (state) => state.inventory.includes('Client Portfolio')
  },
  {
    id: 'dream_job',
    name: 'Dream Achieved',
    description: 'Land your dream job',
    condition: (state) => state.currentScene === 'success'
  },
  // Add more achievements...
]; 