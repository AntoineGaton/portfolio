import { Hint } from '../types/game';

export const hints: Hint[] = [
  {
    sceneId: 'computer',
    condition: (state) => state.stats.coding < 3,
    text: "Tip: Spending time practicing coding will increase your coding skill. Try exploring different commands!"
  },
  {
    sceneId: 'learning_python',
    condition: (state) => !state.inventory.includes('First Python Project'),
    text: "Hint: Building projects is the best way to learn. Make sure your coding skill is at least 3 before starting a project."
  },
  // Add more hints...
]; 