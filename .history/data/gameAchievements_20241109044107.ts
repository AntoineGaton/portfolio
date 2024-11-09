import { GameState } from '../types/game';

interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: (state: GameState) => boolean;
}

export const achievements: Achievement[] = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Begin your coding journey',
    condition: (state) => state.chapter >= 1
  }
  // Add more achievements as needed
]; 