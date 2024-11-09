"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Window } from './Window';

interface Command {
  input: string;
  output: string;
}

export function Terminal() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const commandsEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when commands update
  useEffect(() => {
    commandsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commands]);

  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    inputRef.current?.focus();
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
- whoami: Display user information`;

      case 'clear':
        setCommands([]);
        return '';

      case 'echo':
        return args.slice(1).join(' ');

      case 'date':
        return new Date().toString();

      case 'whoami':
        return 'Antoine Gaton - Software Engineer';

      default:
        return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const output = processCommand(currentInput);
    setCommands([...commands, { input: currentInput, output }]);
    setCurrentInput('');
  };

  return (
    <Window
      id="terminal"
      title="Terminal"
      className="min-w-[500px] min-h-[300px]"
    >
      <div 
        className="flex flex-col h-full bg-black/90 text-green-500 p-4 font-mono text-sm overflow-hidden"
        onClick={handleTerminalClick}
      >
        <div className="flex-1 overflow-y-auto">
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
                className="w-full bg-transparent outline-none"
                autoFocus
              />
            </form>
          </div>
          <div ref={commandsEndRef} />
        </div>
      </div>
    </Window>
  );
} 