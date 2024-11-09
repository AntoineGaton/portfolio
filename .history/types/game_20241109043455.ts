export interface GameState {
  currentScene: string;
  inventory: string[];
  stats: {
    coding: number;
    creativity: number;
    resilience: number;
  };
}

export interface GameCommand {
  command: string;
  response: string;
} 