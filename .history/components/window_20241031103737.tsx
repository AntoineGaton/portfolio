/** */
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
 * @property {boolean} isFullscreen - Whether window is in fullscreen mode
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
  initialPosition: {
    x: number;
    y: number;
    width?: string;
    height?: string;
  };
  isFullscreen?: boolean;
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
  initialPosition,
  defaultIsFullscreen = false
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [storedPosition, setStoredPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(defaultIsFullscreen);
  const [previousPosition, setPreviousPosition] = useState({ x: 100, y: 50 });

  useEffect(() => {
    if (defaultIsFullscreen) {
      setIsFullscreen(true);
      setPosition({ x: 0, y: 0 });
      setSize({ 
        width: window.innerWidth, 
        height: window.innerHeight - 48 // 48px is taskbar height
      });
    }
  }, [defaultIsFullscreen]);

  const handleFullscreen = () => {
    if (!isFullscreen) {
      setPreviousPosition(position);
      setPosition({ x: 0, y: 0 });
      setSize({ 
        width: window.innerWidth, 
        height: window.innerHeight - 48 
      });
    } else {
      setPosition(previousPosition);
      setSize({ width: 800, height: 600 }); // or whatever default size you want
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setPosition({
          x: storedPosition.x + deltaX,
          y: storedPosition.y + deltaY
        });
      }

      if (isResizing && resizeDirection) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        const newSize = { ...initialSize };
        const newPosition = { ...storedPosition };

        if (resizeDirection.includes('e')) {
          newSize.width = Math.max(300, initialSize.width + deltaX);
        }
        if (resizeDirection.includes('w')) {
          const newWidth = Math.max(300, initialSize.width - deltaX);
          newPosition.x = storedPosition.x + (initialSize.width - newWidth);
          newSize.width = newWidth;
        }
        if (resizeDirection.includes('s')) {
          newSize.height = Math.max(200, initialSize.height + deltaY);
        }
        if (resizeDirection.includes('n')) {
          const newHeight = Math.max(200, initialSize.height - deltaY);
          newPosition.y = storedPosition.y + (initialSize.height - newHeight);
          newSize.height = newHeight;
        }

        setSize(newSize);
        setPosition(newPosition);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, storedPosition, initialSize, resizeDirection]);

  const startDrag = (e: React.MouseEvent) => {
    const titleBar = windowRef.current?.querySelector('.window-title-bar');
    if (titleBar?.contains(e.target as Node)) {
      if (isFullscreen) {
        // Exit fullscreen and restore previous size before starting drag
        setIsFullscreen(false);
        setPosition(previousPosition);
        setSize({ width: 800, height: 600 });
      }
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setStoredPosition(position);
    }
  };

  const startResize = (direction: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFullscreen) {
      setIsResizing(true);
      setResizeDirection(direction);
      setDragStart({ x: e.clientX, y: e.clientY });
      setInitialSize(size);
      setStoredPosition(position);
    }
  };

  if (isMinimized) {
    return null;
  }

  return (
    <Card
      ref={windowRef}
      className={cn(
        "fixed bg-background border rounded-lg shadow-lg overflow-hidden select-none",
        isMinimized && "hidden",
        isActive ? 'shadow-xl ring-2 ring-primary' : ''
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isFullscreen ? '100vw' : `${size.width}px`,
        height: isFullscreen ? `calc(100vh - 48px)` : `${size.height}px`,
        zIndex: 1000 + windowIndex
      }}
      onClick={onClick}
      onMouseDown={startDrag}
    >
      {/* Window Title Bar */}
      <div
        className="h-10 bg-background border-b flex items-center justify-between px-4 cursor-move window-title-bar"
        onMouseDown={startDrag}
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
          <div className="absolute inset-0 pointer-events-none border border-transparent" />
          <div className="absolute top-0 left-0 w-3 h-full cursor-w-resize hover:bg-primary/10" onMouseDown={startResize('w')} />
          <div className="absolute top-0 right-0 w-3 h-full cursor-e-resize hover:bg-primary/10" onMouseDown={startResize('e')} />
          <div className="absolute top-0 left-0 h-3 w-full cursor-n-resize hover:bg-primary/10" onMouseDown={startResize('n')} />
          <div className="absolute bottom-0 left-0 h-3 w-full cursor-s-resize hover:bg-primary/10" onMouseDown={startResize('s')} />
          <div className="absolute top-0 left-0 w-5 h-5 cursor-nw-resize hover:bg-primary/10" onMouseDown={startResize('nw')} />
          <div className="absolute top-0 right-0 w-5 h-5 cursor-ne-resize hover:bg-primary/10" onMouseDown={startResize('ne')} />
          <div className="absolute bottom-0 left-0 w-5 h-5 cursor-sw-resize hover:bg-primary/10" onMouseDown={startResize('sw')} />
          <div className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize hover:bg-primary/10" onMouseDown={startResize('se')} />
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
