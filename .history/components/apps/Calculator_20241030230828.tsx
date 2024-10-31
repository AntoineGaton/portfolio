"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation("");
      setIsNewNumber(true);
    } catch (error) {
      setDisplay("Error");
      setEquation("");
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setIsNewNumber(true);
  };

  return (
    <Card className="p-6 max-w-xs mx-auto">
      <div className="bg-secondary p-4 rounded-lg mb-4 text-right">
        <div className="text-sm text-muted-foreground">{equation}</div>
        <div className="text-2xl font-bold">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button variant="outline" onClick={handleClear} className="col-span-2">C</Button>
        <Button variant="outline" onClick={() => handleOperator("/")}>/</Button>
        <Button variant="outline" onClick={() => handleOperator("*")}>×</Button>

        {[7, 8, 9].map(num => (
          <Button key={num} variant="outline" onClick={() => handleNumber(String(num))}>
            {num}
          </Button>
        ))}
        <Button variant="outline" onClick={() => handleOperator("-")}>-</Button>

        {[4, 5, 6].map(num => (
          <Button key={num} variant="outline" onClick={() => handleNumber(String(num))}>
            {num}
          </Button>
        ))}
        <Button variant="outline" onClick={() => handleOperator("+")}>+</Button>

        {[1, 2, 3].map(num => (
          <Button key={num} variant="outline" onClick={() => handleNumber(String(num))}>
            {num}
          </Button>
        ))}
        <Button variant="default" onClick={handleEqual} className="row-span-2">=</Button>

        <Button variant="outline" onClick={() => handleNumber("0")} className="col-span-2">
          0
        </Button>
        <Button variant="outline" onClick={() => handleNumber(".")}>.</Button>
      </div>
    </Card>
  );
}