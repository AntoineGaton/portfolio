"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Maximize2, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Window Props Interface
 * @interface WindowProps
 * @property {string} title - Window title
 * @property {ReactNode} children - Window content
 * @property {boolean} isActive - Whether window is currently focused
 * @property {boolean} isMinimized - Whether window is minimized
 * @property {() => void} onClose - Close handler
 * @property {() => void} onClick - Click handler
 * @property {() => void} onMinimize - Minimize handler
 */
interface WindowProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onClick: () => void;
  onMinimize: () => void;
}

/**
 * Window Component
 * Provides a draggable, resizable window interface
 * @component
 */
export function Window({
  title,
  children,
  isActive,
  isMinimized,
  onClose,
  onClick,
  onMinimize
}: WindowProps) {
  // Window state management
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 100, y: 50 });
  const windowRef = useRef<HTMLDivElement>(null);

  /**
   * Handles fullscreen toggle
   * Stores/restores window position
   */
  const handleFullscreen = () => {
    if (!isFullscreen) {
      setPreviousPosition(position);
      setPosition({ x: 0, y: 0 });
    } else {
      setPosition(previousPosition);
    }
    setIsFullscreen(!isFullscreen);
  };

  /**
   * Window dragging effect
   * Handles mouse movement and position updates
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && windowRef.current && !isFullscreen) {
        const newPosition = constrainPosition(
          e.clientX - dragOffset.x,
          e.clientY - dragOffset.y
        );
        
        setPosition(newPosition);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isFullscreen]);

  /**
   * Initializes window dragging
   * @param {React.MouseEvent} e - Mouse event
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current && !isFullscreen) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  // Add this function to handle constrained position
  const constrainPosition = (x: number, y: number) => {
    if (!windowRef.current) return { x, y };
    
    const windowWidth = windowRef.current.offsetWidth;
    const windowHeight = windowRef.current.offsetHeight;
    
    return {
      x: Math.min(Math.max(0, x), window.innerWidth - windowWidth),
      y: Math.min(Math.max(0, y), window.innerHeight - windowHeight)
    };
  };

  // Add this function to generate a random position
  const getRandomPosition = () => {
    if (typeof window === 'undefined' || !windowRef.current) return { x: 0, y: 0 };
    
    const padding = 50; // Padding from screen edges
    const windowWidth = windowRef.current.offsetWidth || 500;
    const windowHeight = windowRef.current.offsetHeight || 400;
    
    const maxX = window.innerWidth - windowWidth - padding;
    const maxY = window.innerHeight - windowHeight - padding;
    
    return {
      x: Math.max(padding, Math.floor(Math.random() * maxX)),
      y: Math.max(padding, Math.floor(Math.random() * maxY))
    };
  };

  // Update the initial position state and useEffect
  useEffect(() => {
    if (typeof window !== 'undefined' && windowRef.current) {
      const randomPos = getRandomPosition();
      setPosition(randomPos);
    }
  }, []); // Empty dependency array means this runs once when component mounts

  // Return null if window is minimized
  if (isMinimized) {
    return null;
  }

  return (
    <Card
      ref={windowRef}
      className={cn(
        "fixed bg-background border rounded-lg shadow-lg overflow-hidden",
        isFullscreen ? (
          // Fullscreen styles
          "w-screen h-screen top-0 left-0"
        ) : (
          // Normal window styles
          [
            "w-[40vw] sm:w-[35vw] md:w-[30vw] lg:w-[25vw]",
            "h-[50vh] sm:h-[55vh]",
            "max-w-xl",
            "max-h-[60vh]"
          ]
        ),
        isMinimized && "hidden",
        isActive ? 'shadow-xl ring-2 ring-primary' : ''
      )}
      style={
        !isFullscreen 
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'none'
            }
          : {
              left: 0,
              top: 0,
              transform: 'none'
            }
      }
      onClick={onClick}
    >
      {/* Window Title Bar */}
      <div
        className="h-10 bg-background border-b flex items-center justify-between px-4 cursor-move"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleFullscreen}
      >
        <span className="font-medium">{title}</span>
        <div className="flex items-center gap-2">
          {/* Window Controls */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              handleFullscreen();
            }}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Window Content */}
      <div className="p-4 h-[calc(100%-2.5rem)] overflow-auto">
        {children}
      </div>
    </Card>
  );
}