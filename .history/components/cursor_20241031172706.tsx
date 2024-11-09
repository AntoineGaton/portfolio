// Not used anymore but keeping it for now as it's a good example of a custom cursor 
"use client";

import { useEffect, useState } from "react";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{
        transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
      }}
    >
      <div
        className={`h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
          isPointer ? "scale-150" : "scale-100"
        }`}
      />
    </div>
  );
}