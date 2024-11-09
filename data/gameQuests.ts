import { Quest } from '../types/game';

export const quests: Quest[] = [
  {
    id: 'portfolio_builder',
    title: 'Build Your Portfolio',
    description: 'Create three different projects to showcase your skills.',
    isComplete: (state) => {
      const projectCount = state.inventory.filter(item => 
        item.includes('Project')).length;
      return projectCount >= 3;
    },
    reward: {
      stats: { coding: 2, creativity: 2 },
      items: ['Professional Portfolio']
    }
  },
  // Add more quests...
]; 