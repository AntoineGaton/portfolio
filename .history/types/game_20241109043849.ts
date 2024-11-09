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

export interface GameSave {
  timestamp: number;
  state: GameState;
  description: string;
}

export interface Hint {
  sceneId: string;
  condition: (state: GameState) => boolean;
  text: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  isComplete: (state: GameState) => boolean;
  reward?: {
    stats?: Partial<Record<'coding' | 'creativity' | 'resilience', number>>;
    items?: string[];
  };
} 