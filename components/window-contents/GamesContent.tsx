"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TicTacToe } from "../games/TicTacToe";
import { Gamepad2 } from "lucide-react";

interface Game {
  id: string;
  name: string;
  component: React.ComponentType;
}

export function GamesContent() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games: Game[] = [
    { id: "tictactoe", name: "Tic Tac Toe", component: TicTacToe },
  ];

  const GameComponent = selectedGame 
    ? games.find(game => game.id === selectedGame)?.component 
    : null;

  return (
    <div className="space-y-6">
      {!selectedGame ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {games.map((game) => (
              <Card
                key={game.id}
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setSelectedGame(game.id)}
              >
                <div className="flex flex-col items-center gap-2">
                  <Gamepad2 className="h-8 w-8" />
                  <span className="font-medium">{game.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedGame(null)}
            className="mb-4"
          >
            ← Back to Games
          </Button>
          {GameComponent && <GameComponent />}
        </div>
      )}
    </div>
  );
}