export interface GameState {
  currentScene: string;
  inventory: string[];
  stats: {
    coding: number;
    creativity: number;
    resilience: number;
  };
  achievements: string[];
  chapter: number;
  decisions: Record<string, string>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: (state: GameState) => boolean;
}

export interface GameCommand {
  command: string;
  response: string;
} 