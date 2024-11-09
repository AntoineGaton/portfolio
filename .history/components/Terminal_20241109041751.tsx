"use client";
import React, { useState, useRef, useEffect } from 'react';

interface Command {
input: string;
output: string;
}

export function Terminal() {
const [commands, setCommands] = useState<Command[]>([]);
const [currentInput, setCurrentInput] = useState('');
const [commandHistory, setCommandHistory] = useState<string[]>([]);
const [historyIndex, setHistoryIndex] = useState(-1);
const [isJSMode, setIsJSMode] = useState(false);
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
            output: 'Exited JavaScript environment' 
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
        return 'Entering JavaScript environment (Ctrl+C to exit)';

      default:
      return `Command not found: ${command}. Type 'help' for available commands.`;
   }
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!currentInput.trim()) return;

  if (isJSMode) {
    try {
      const result = eval(currentInput);
      setCommands(prev => [...prev, { 
        input: currentInput, 
        output: result !== undefined ? String(result) : '' 
      }]);
    } catch (error) {
      setCommands(prev => [...prev, { 
        input: currentInput, 
        output: `Error: ${error.message}` 
      }]);
    }
  } else {
    const output = processCommand(currentInput);
    if (currentInput.trim().toLowerCase() !== 'clear') {
      setCommands(prev => [...prev, { input: currentInput, output }]);
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
    return `Error: ${error.message}`;
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
               {isJSMode ? (
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
         {isJSMode ? (
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