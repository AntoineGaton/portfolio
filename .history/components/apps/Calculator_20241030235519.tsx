"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Calculator Component
 * Simple calculator application
 * @component
 */
export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState<string[]>([]);
  const [isNewNumber, setIsNewNumber] = useState(true);

  /**
   * Handles number input
   * @param {string} num - Number pressed
   */
  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  /**
   * Handles operator input
   * @param {string} op - Operator pressed
   */
  const handleOperator = (op: string) => {
    setEquation([...equation, display, op]);
    setIsNewNumber(true);
  };

  /**
   * Calculates the result
   */
  const calculate = () => {
    const fullEquation = [...equation, display];
    try {
      const result = eval(fullEquation.join(" "));
      setDisplay(result.toString());
      setEquation([]);
      setIsNewNumber(true);
    } catch (error) {
      setDisplay("Error");
      setEquation([]);
      setIsNewNumber(true);
    }
  };

  /**
   * Clears the calculator
   */
  const clear = () => {
    setDisplay("0");
    setEquation([]);
    setIsNewNumber(true);
  };

  return (
    <div className="w-full max-w-xs mx-auto p-4">
      <div className="bg-secondary p-4 rounded-lg mb-4">
        <div className="text-right text-2xl font-mono">{display}</div>
        <div className="text-right text-sm text-muted-foreground">
          {equation.join(" ")}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {/* Calculator buttons */}
        <Button onClick={clear} variant="destructive" className="col-span-2">
          C
        </Button>
        <Button onClick={() => handleOperator("/")}>/</Button>
        <Button onClick={() => handleOperator("*")}>×</Button>
        
        {/* Number pad */}
        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
          <Button key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </Button>
        ))}
        
        {/* Operations */}
        <Button onClick={() => handleOperator("-")}>-</Button>
        <Button onClick={() => handleOperator("+")}>+</Button>
        <Button onClick={() => handleNumber("0")} className="col-span-2">
          0
        </Button>
        <Button onClick={() => handleNumber(".")}>.</Button>
        <Button onClick={calculate} variant="default">=</Button>
      </div>
    </div>
  );
}