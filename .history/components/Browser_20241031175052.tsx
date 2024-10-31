"use client";

import { useState, useRef, useEffect } from "react";
import { Minus, Maximize2, Minimize2, X, ChevronLeft, ChevronRight, RotateCcw, Shield, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface BrowserProps {
   title: string;
   children: React.ReactNode;
   isActive: boolean;
   isMinimized: boolean;
   onClose: () => void;
   onClick: () => void;
   onMinimize: () => void;
   windowIndex: number;
   initialPosition: {
      x: number;
      y: number;
      width?: string;
      height?: string;
   };
   isFullscreen?: boolean;
}

export function Browser({
   title,
   children,
   isActive,
   isMinimized,
   onClose,
   onClick,
   onMinimize,
   windowIndex,
   initialPosition,
   isFullscreen: defaultIsFullscreen = false
}: BrowserProps) {
  // Reference Window.tsx for state management and drag/resize functionality
   const windowRef = useRef<HTMLDivElement>(null);
   const [isDragging, setIsDragging] = useState(false);
   const [position, setPosition] = useState(initialPosition);
   const [size, setSize] = useState({ width: 800, height: 600 });
   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
   const [isFullscreen, setIsFullscreen] = useState(defaultIsFullscreen);
   const [previousPosition, setPreviousPosition] = useState({ x: 100, y: 50 });

  // Reuse the drag handling logic from Window.tsx
   const startDrag = (e: React.MouseEvent) => {
      if (isFullscreen) return;
      setIsDragging(true);
      setDragStart({
         x: e.clientX - position.x,
         y: e.clientY - position.y
      });
   };

   const handleDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
         x: e.clientX - dragStart.x,
         y: e.clientY - dragStart.y
      });
   };

   const stopDrag = () => {
      setIsDragging(false);
   };

   const handleFullscreen = () => {
      if (!isFullscreen) {
         setPreviousPosition(position);
         setPosition({ x: 0, y: 0 });
         setSize({ width: window.innerWidth, height: window.innerHeight - 48 });
      } else {
         setPosition(previousPosition);
         setSize({ width: 800, height: 600 });
      }
      setIsFullscreen(!isFullscreen);
   };

   useEffect(() => {
      if (isDragging) {
         window.addEventListener('mousemove', handleDrag);
         window.addEventListener('mouseup', stopDrag);
      }
      return () => {
         window.removeEventListener('mousemove', handleDrag);
         window.removeEventListener('mouseup', stopDrag);
      };
   }, [isDragging]);

   if (isMinimized) return null;

   return (
      <Card
         ref={windowRef}
         className={cn(
            "fixed overflow-hidden shadow-lg",
            isFullscreen ? "w-screen h-[calc(100vh-48px)]" : "w-[800px] h-[600px]",
            isActive ? "z-50" : "z-40"
      )}
      style={isFullscreen ? undefined : {
         transform: `translate(${position.x}px, ${position.y}px)`,
         width: size.width,
         height: size.height
      }}
         onClick={onClick}
      >
         {/* Chrome-style title bar */}
         <div 
         className="h-10 bg-[#202124] flex items-center justify-between px-2"
         onMouseDown={startDrag}
      >
         <div className="flex items-center gap-2">
            <div className="flex items-center h-8 px-4 gap-2 bg-[#35363a] rounded-t-lg">
               <div className="w-3 h-3 rounded-full bg-gray-500" />
               <span className="text-gray-200 text-sm">{title}</span>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <Button
               variant="ghost"
               size="icon"
               className="h-6 w-6"
               onClick={onMinimize}
            >
               <Minus className="h-4 w-4" />
            </Button>
            <Button
               variant="ghost"
               size="icon"
               className="h-6 w-6"
               onClick={handleFullscreen}
            >
               {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
               variant="ghost"
               size="icon"
               className="h-6 w-6"
               onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chrome URL bar */}
      <div className="flex items-center px-2 h-10 gap-2 bg-[#202124]">
        <div className="flex gap-1">
          <button className="p-1.5 hover:bg-[#35363a] rounded-full">
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-[#35363a] rounded-full">
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-[#35363a] rounded-full">
            <RotateCcw className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 flex items-center">
          <div className="bg-[#35363a] flex items-center gap-2 px-4 py-1.5 rounded-full w-full max-w-2xl">
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-gray-200 text-sm">http://localhost:3000/{title.toLowerCase()}</span>
          </div>
        </div>

        <button className="p-1.5 hover:bg-[#35363a] rounded-full">
          <Star className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-5rem)] overflow-auto bg-white dark:bg-black">
        {children}
      </div>
    </Card>
  );
} 