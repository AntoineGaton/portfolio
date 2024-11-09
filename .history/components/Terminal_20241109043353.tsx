"use client";
import React, { useState, useRef, useEffect } from 'react';

interface Command {
input: string;
output: string;
isJSMode: boolean;
isGameMode?: boolean;
}

interface GameState {
  currentScene: string;
  inventory: string[];
  stats: {
    coding: number;
    creativity: number;
    resilience: number;
  };
}

export function Terminal() {
const [commands, setCommands] = useState<Command[]>([]);
const [currentInput, setCurrentInput] = useState('');
const [commandHistory, setCommandHistory] = useState<string[]>([]);
const [historyIndex, setHistoryIndex] = useState(-1);
const [isJSMode, setIsJSMode] = useState(false);
const [jsContext, setJsContext] = useState<Record<string, any>>({});
const [isGameMode, setIsGameMode] = useState(false);
const [gameState, setGameState] = useState<GameState>({
  currentScene: 'intro',
  inventory: [],
  stats: {
    coding: 1,
    creativity: 1,
    resilience: 1,
  }
});
const inputRef = useRef<HTMLInputElement>(null);
const commandsEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
   commandsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [commands]);

const handleTerminalClick = () => {
   inputRef.current?.focus();
};

const handleKeyDown = (e: React.KeyboardEvent) => {
   if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      if (isJSMode) {
         setIsJSMode(false);
         setCommands(prev => [...prev, { 
            input: '^C', 
            output: 'Exited JavaScript environment',
            isJSMode: false
         }]);
         return;
      }
   }

   if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
         const newIndex = historyIndex + 1;
         setHistoryIndex(newIndex);
         setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
   } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
         const newIndex = historyIndex - 1;
         setHistoryIndex(newIndex);
         setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
         setHistoryIndex(-1);
         setCurrentInput('');
      }
   }
};

const processCommand = (input: string): string => {
   const args = input.trim().split(' ');
   const command = args[0].toLowerCase();

   switch (command) {
      case 'help':
      return `Available commands:
- help: Show this help message
- clear: Clear the terminal
- echo [text]: Display text
- date: Show current date and time
- whoami: Display user information
- ls: List available commands
- history: Show command history
- open [app]: Open an application
- social: Show social links
- contact: Show contact information
- js [code]: Execute JavaScript code
- python [code]: Execute Python code`;

      case 'clear':
      setCommands([]);
      return '';

      case 'echo':
      return args.slice(1).join(' ');

      case 'date':
      return new Date().toLocaleString();

      case 'whoami':
      return 'Antoine Gaton - Software Engineer';

      case 'ls':
      return `Available applications:
- about
- projects
- experience
- resume
- contact
- games
- terminal`;

      case 'history':
      return commandHistory.join('\n');

      case 'open':
      if (args.length < 2) return 'Please specify an application to open';
      const app = args[1].toLowerCase();
      
      // List of valid apps
      const validApps = ['about', 'projects', 'experience', 'resume', 'contact', 'games', 'terminal'];
      
      if (!validApps.includes(app)) {
        return `Invalid application: ${app}. Type 'ls' to see available applications.`;
      }

      // Dispatch custom event to open window
      const event = new CustomEvent('openWindow', {
        detail: { 
          windowId: app,
          makeActive: true 
        },
        bubbles: true
      });
      window.dispatchEvent(event);
      
      return `Opening ${app}...`;

      case 'social':
      return `Find me on:
- GitHub: https://github.com/antoinegaton
- LinkedIn: https://linkedin.com/in/antoinegaton`;

      case 'contact':
      const handleOpen = (type: string, value: string) => {
        switch (type) {
          case 'email':
            window.location.href = `mailto:${value}`;
            break;
          case 'phone':
            window.location.href = `tel:${value}`;
            break;
          default:
            break;
        }
      };

      return `Contact Information:
- Email: <a href="#" onClick="handleOpen('email', 'swe.antoine.gaton@gmail.com')">swe.antoine.gaton@gmail.com</a>
- Location: Fort Lauderdale, FL, USA
- Phone: <a href="#" onClick="handleOpen('phone', '+15708568090')">+1 (570) 856-8090</a>
`.trim();

      case 'js':
      case 'javascript':
        setIsJSMode(true);
        setJsContext({});
        return 'Entering JavaScript environment (Ctrl+C to exit)';

      case 'game':
        setIsGameMode(true);
        setGameState({
          currentScene: 'intro',
          inventory: [],
          stats: { coding: 1, creativity: 1, resilience: 1 }
        });
        return `Welcome to "The Code Monkey's Path"!
A text-based adventure game based on a true story.

Type 'look' to examine your surroundings
Type 'stats' to view your current stats
Type 'inventory' to check your items
Type 'quit' to exit the game

Press Enter to begin your journey...`;

      default:
      return `Command not found: ${command}. Type 'help' for available commands.`;
   }
};

const processGameCommand = (input: string): string => {
  const command = input.toLowerCase().trim();

  if (command === 'quit') {
    setIsGameMode(false);
    return 'Thanks for playing!';
  }

  if (command === 'stats') {
    return `Your Stats:
Coding: ${gameState.stats.coding}
Creativity: ${gameState.stats.creativity}
Resilience: ${gameState.stats.resilience}`;
  }

  if (command === 'inventory') {
    return gameState.inventory.length > 0 
      ? `Your inventory: ${gameState.inventory.join(', ')}` 
      : 'Your inventory is empty';
  }

  switch (gameState.currentScene) {
    case 'intro':
      if (command === 'look') {
        return `The Bronx, NY - 1990s

You find yourself in your childhood bedroom, surrounded by comics, books, and the soft glow of an old computer monitor. The streets outside are busy with the usual sounds of the city, but in here, you've created your own sanctuary.

Options:
1) Explore the computer
2) Read some comics
3) Look out the window`;
      }
      if (['1', 'explore computer', 'computer'].includes(command)) {
        setGameState(prev => ({
          ...prev,
          currentScene: 'computer',
          stats: { ...prev.stats, coding: prev.stats.coding + 1 }
        }));
        return `You sit down at the old computer, its fan humming quietly. The screen flickers to life, showing a basic DOS prompt. Something about it captivates you...

Your coding skill increased!

Options:
1) Try typing some commands
2) Look through the programs
3) Go back to exploring the room`;
      }
      if (['2', 'read comics', 'comics'].includes(command)) {
        setGameState(prev => ({
          ...prev,
          currentScene: 'comics',
          stats: { ...prev.stats, creativity: prev.stats.creativity + 1 }
        }));
        return `You pick up some of your favorite comics. The pages are worn from countless readings, but the stories still captivate you. You see Watchmen, V for Vendetta, and various manga volumes.

Your creativity increased!

Options:
1) Read Watchmen
2) Read manga
3) Put the comics away`;
      }
      if (['3', 'window', 'look window'].includes(command)) {
        setGameState(prev => ({
          ...prev,
          currentScene: 'window',
          stats: { ...prev.stats, resilience: prev.stats.resilience + 1 }
        }));
        return `The bustling streets of the Bronx stretch out before you. Life isn't always easy here, but there's a vibrant energy that can't be denied. You watch people going about their lives, each with their own story.

Your resilience increased!

Options:
1) People watch
2) Think about the future
3) Return to your room`;
      }
      return "Try looking around first with the 'look' command";

    case 'computer':
      if (command === 'look') {
        return `The computer screen glows with possibility. You've spent countless hours here, learning and experimenting.

Options:
1) Try typing some commands
2) Look through the programs
3) Go back to exploring the room`;
      }
      if (['1', 'type', 'commands'].includes(command)) {
        setGameState(prev => ({
          ...prev,
          currentScene: 'coding',
          stats: { ...prev.stats, coding: prev.stats.coding + 1 },
          inventory: [...prev.inventory, 'Basic Programming Manual']
        }));
        return `You start typing commands, learning the basics of DOS. Something clicks in your mind - this feels right.

You found: Basic Programming Manual
Your coding skill increased!

Options:
1) Keep practicing
2) Read the manual
3) Return to your room`;
      }
      if (['3', 'back', 'return'].includes(command)) {
        setGameState(prev => ({
          ...prev,
          currentScene: 'intro'
        }));
        return `You step away from the computer, returning to your room.

Type 'look' to see your surroundings again.`;
      }
      return "Try 'look' to see your options.";

    case 'comics':
      if (command === 'look') {
        return `Your comic collection is spread out before you. Each volume represents a different world to explore.

Options:
1) Read Watchmen
2) Read manga
3) Put the comics away`;
      }
      if (['1', 'watchmen'].includes(command)) {
        setGameState(prev => ({
          ...prev,
          stats: { ...prev.stats, creativity: prev.stats.creativity + 1 },
          inventory: [...prev.inventory, 'Storytelling Insights']
        }));
        return `You lose yourself in the complex narrative of Watchmen. The intricate storytelling and moral ambiguity make you think deeply about design and structure.

You gained: Storytelling Insights
Your creativity increased!

Options:
1) Keep reading
2) Think about the story
3) Put it away`;
      }
      if (['3', 'away', 'put away'].includes(command)) {
        setGameState(prev => ({
          ...prev,
          currentScene: 'intro'
        }));
        return `You carefully put the comics away and return your attention to your room.

Type 'look' to see your surroundings again.`;
      }
      return "Try 'look' to see your options.";

    case 'window':
      if (command === 'look') {
        return `The city stretches out before you, a concrete jungle full of challenges and opportunities.

Options:
1) People watch
2) Think about the future
3) Return to your room`;
      }
      if (['2', 'think', 'future'].includes(command)) {
        setGameState(prev => ({
          ...prev,
          stats: { ...prev.stats, resilience: prev.stats.resilience + 1 },
          inventory: [...prev.inventory, 'Dreams & Ambitions']
        }));
        return `As you gaze out at the city, you dream about your future. Despite the challenges, you know technology could be your path to something greater.

You gained: Dreams & Ambitions
Your resilience increased!

Options:
1) Keep dreaming
2) Make a plan
3) Return to your room`;
      }
      if (['3', 'return', 'room'].includes(command)) {
        setGameState(prev => ({
          ...prev,
          currentScene: 'intro'
        }));
        return `You step back from the window, returning your attention to your room.

Type 'look' to see your surroundings again.`;
      }
      return "Try 'look' to see your options.";

    default:
      return "I don't understand that command.";
  }
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!currentInput.trim()) return;

  if (isGameMode) {
    const output = processGameCommand(currentInput);
    setCommands(prev => [...prev, { 
      input: currentInput, 
      output,
      isJSMode: false,
      isGameMode: true
    }]);
  } else if (isJSMode) {
    try {
      // Create a function with all previous context
      const contextKeys = Object.keys(jsContext);
      const contextValues = Object.values(jsContext);
      
      // Handle multi-line code and different types of statements
      let result;
      try {
        // First try to evaluate as an expression
        result = new Function(...contextKeys, `return ${currentInput}`)(...contextValues);
      } catch {
        // If that fails, try to execute as statements
        result = new Function(...contextKeys, currentInput)(...contextValues);
      }

      // Update context with any new declarations
      const newContext = { ...jsContext };
      try {
        const contextUpdates = new Function(
          ...contextKeys,
          `${currentInput}; return { ${contextKeys.join(',')} };`
        )(...contextValues);
        Object.assign(newContext, contextUpdates);
      } catch (e) {
        // Ignore context update errors
      }
      setJsContext(newContext);

      // Add command to history
      setCommands(prev => [...prev, { 
        input: currentInput, 
        output: result !== undefined ? String(result) : '',
        isJSMode: true
      }]);
    } catch (error) {
      setCommands(prev => [...prev, { 
        input: currentInput, 
        output: `Error: ${(error as Error).message}`,
        isJSMode: true
      }]);
    }
  } else {
    const output = processCommand(currentInput);
    if (currentInput.trim().toLowerCase() !== 'clear') {
      setCommands(prev => [...prev, { 
        input: currentInput, 
        output,
        isJSMode: false 
      }]);
      setCommandHistory(prev => [...prev, currentInput]);
    }
  }
  
  setCurrentInput('');
  setHistoryIndex(-1);
};

const executeCode = (language: string, code: string): string => {
  try {
    switch (language) {
      case 'js':
      case 'javascript':
        // Execute JavaScript code using Function constructor
        const result = new Function(`return ${code}`)();
        return String(result);

      default:
        return `Unsupported language: ${language}`;
    }
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};

return (
   <div 
      className="flex flex-col h-full bg-black/90 text-green-500 p-4 font-mono text-sm overflow-hidden"
      onClick={handleTerminalClick}
   >
      <div className="flex-1 overflow-y-auto">
      <div className="mb-4">
         Welcome to Portfolio Terminal v1.0.0
         Type 'help' for available commands.
      </div>
      {commands.map((cmd, i) => (
         <div key={i}>
            <div className="flex items-center">
               {cmd.isJSMode ? (
                  <span className="text-yellow-400">js&gt;</span>
               ) : (
                  <>
                     <span className="text-blue-400">guest@portfolio</span>
                     <span className="text-gray-400">:~$</span>
                  </>
               )}
               <span className="ml-2">{cmd.input}</span>
            </div>
            <div className="whitespace-pre-wrap">{cmd.output}</div>
         </div>
      ))}
      <div className="flex items-center">
         {isGameMode ? (
            <span className="text-purple-400">game&gt;</span>
         ) : isJSMode ? (
            <span className="text-yellow-400">js&gt;</span>
         ) : (
            <>
               <span className="text-blue-400">guest@portfolio</span>
               <span className="text-gray-400">:~$</span>
            </>
         )}
         <form onSubmit={handleSubmit} className="flex-1 ml-2">
            <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none"
            autoFocus
            />
         </form>
      </div>
      <div ref={commandsEndRef} />
      </div>
   </div>
);
} 