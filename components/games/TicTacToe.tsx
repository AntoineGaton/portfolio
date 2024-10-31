"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Player = "X" | "O";
type Board = (Player | null)[];

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);

  const checkWinner = useCallback((squares: Board): Player | "draw" | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Player;
      }
    }

    if (squares.every(square => square !== null)) {
      return "draw";
    }

    return null;
  }, []);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-4">
        {winner ? (
          <h2 className="text-2xl font-bold mb-4">
            {winner === "draw" ? "It's a draw!" : `Player ${winner} wins!`}
          </h2>
        ) : (
          <h2 className="text-2xl font-bold mb-4">
            Player {currentPlayer}'s turn
          </h2>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, index) => (
          <Button
            key={index}
            variant={cell ? "default" : "outline"}
            className="h-20 text-2xl font-bold"
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner}
          >
            {cell}
          </Button>
        ))}
      </div>

      <Button 
        className="w-full" 
        onClick={resetGame}
      >
        New Game
      </Button>
    </Card>
  );
}