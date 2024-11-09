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
const inputRef = useRef<HTMLInputElement>(null);
const commandsEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
   commandsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [commands]);

const handleTerminalClick = () => {
   inputRef.current?.focus();
};

const handleKeyDown = (e: React.KeyboardEvent) => {
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
- contact: Show contact information`;

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
      // You'll need to implement this function to open windows
      // handleOpenWindow(app);
      return `Opening ${app}...`;

      case 'social':
      return `Find me on:
- GitHub: https://github.com/antoinegaton
- LinkedIn: https://linkedin.com/in/antoinegaton

      case 'contact':
      return `Contact Information:
- Email: swe.antoine.gaton@gmail.com
- Location: Fort Lauderdale, FL, USA
- Phone: +1 (570) 200-1182`;

      default:
      return `Command not found: ${command}. Type 'help' for available commands.`;
   }
};

const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   if (!currentInput.trim()) return;

   const output = processCommand(currentInput);
   if (currentInput.trim().toLowerCase() !== 'clear') {
      setCommands([...commands, { input: currentInput, output }]);
      setCommandHistory([...commandHistory, currentInput]);
   }
   setCurrentInput('');
   setHistoryIndex(-1);
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
            <span className="text-blue-400">guest@portfolio</span>
            <span className="text-gray-400">:~$</span>
            <span className="ml-2">{cmd.input}</span>
            </div>
            <div className="whitespace-pre-wrap">{cmd.output}</div>
         </div>
      ))}
      <div className="flex items-center">
         <span className="text-blue-400">guest@portfolio</span>
         <span className="text-gray-400">:~$</span>
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