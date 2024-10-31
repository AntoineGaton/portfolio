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
 * @property {number} windowIndex - Window index
 * @property {number} initialPosition - Initial position of the window
 */
interface WindowProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onClick: () => void;
  onMinimize: () => void;
  windowIndex: number;
  initialPosition: { x: number; y: number };
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
  onMinimize,
  windowIndex,
  initialPosition
}: WindowProps) {
  // Window state management
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 100, y: 50 });
  const windowRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        e.preventDefault();
        const deltaX = e.clientX - startPos.x;
        const deltaY = e.clientY - startPos.y;
        
        const newSize = { ...size };
        const newPosition = { ...position };

        switch (resizeDirection) {
          case 'e':
            newSize.width = Math.max(300, startSize.width + deltaX);
            break;
          case 'w':
            newSize.width = Math.max(300, startSize.width - deltaX);
            newPosition.x = startPos.x + deltaX;
            break;
          case 's':
            newSize.height = Math.max(200, startSize.height + deltaY);
            break;
          case 'n':
            newSize.height = Math.max(200, startSize.height - deltaY);
            newPosition.y = startPos.y + deltaY;
            break;
          case 'se':
            newSize.width = Math.max(300, startSize.width + deltaX);
            newSize.height = Math.max(200, startSize.height + deltaY);
            break;
          case 'sw':
            newSize.width = Math.max(300, startSize.width - deltaX);
            newSize.height = Math.max(200, startSize.height + deltaY);
            newPosition.x = startPos.x + deltaX;
            break;
          case 'ne':
            newSize.width = Math.max(300, startSize.width + deltaX);
            newSize.height = Math.max(200, startSize.height - deltaY);
            newPosition.y = startPos.y + deltaY;
            break;
          case 'nw':
            newSize.width = Math.max(300, startSize.width - deltaX);
            newSize.height = Math.max(200, startSize.height - deltaY);
            newPosition.x = startPos.x + deltaX;
            newPosition.y = startPos.y + deltaY;
            break;
        }

        setSize(newSize);
        setPosition(newPosition);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startPos, startSize, resizeDirection]);

  const startResize = (direction: string) => (e: React.MouseEvent) => {
    if (!isFullscreen) {
      e.preventDefault();
      setIsResizing(true);
      setResizeDirection(direction);
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartSize(size);
    }
  };

  // Return null if window is minimized
  if (isMinimized) {
    return null;
  }

  return (
    <Card
      ref={windowRef}
      className={cn(
        "fixed bg-background border rounded-lg shadow-lg overflow-hidden",
        "w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw]",
        "h-[80vh]",
        "min-w-[300px]",
        "min-h-[200px]",
        isMinimized && "hidden",
        isActive ? 'shadow-xl ring-2 ring-primary' : '',
        "max-w-5xl",
        "max-h-[85vh]"
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
              width: '100vw',
              height: '100vh',
              maxWidth: '100vw',
              maxHeight: '100vh'
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
      {/* Resize handles */}
      {!isFullscreen && (
        <>
          <div className="absolute top-0 left-0 w-1 h-full cursor-w-resize" onMouseDown={startResize('w')} />
          <div className="absolute top-0 right-0 w-1 h-full cursor-e-resize" onMouseDown={startResize('e')} />
          <div className="absolute top-0 left-0 h-1 w-full cursor-n-resize" onMouseDown={startResize('n')} />
          <div className="absolute bottom-0 left-0 h-1 w-full cursor-s-resize" onMouseDown={startResize('s')} />
          <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize" onMouseDown={startResize('nw')} />
          <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize" onMouseDown={startResize('ne')} />
          <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" onMouseDown={startResize('sw')} />
          <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={startResize('se')} />
        </>
      )}
      {/* Window Content */}
      <div className="p-4 h-[calc(100%-2.5rem)] overflow-auto">
        {children}
      </div>
    </Card>
  );
}

// Add these helper functions at the top of your file
const GRID_SIZE = 20; // pixels between each window position
const MAX_POSITIONS = 5; // how many positions before reset

const calculateNextPosition = (windowIndex: number) => {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  
  // Create a cascading effect
  const baseX = 50 + (windowIndex % MAX_POSITIONS) * GRID_SIZE;
  const baseY = 50 + (windowIndex % MAX_POSITIONS) * GRID_SIZE;
  
  return {
    x: Math.min(baseX, window.innerWidth - 500), // 500 is approximate window width
    y: Math.min(baseY, window.innerHeight - 400) // 400 is approximate window height
  };
};
