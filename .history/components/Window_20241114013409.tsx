/**
 * TODO:
 * - When window is dragged to right side of screen, window resizes to fill right side of screen and same for left
 * - When window is dragged to bottom of screen, window resizes to fill bottom of screen and same for top
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Maximize2, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

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
 * @property {string} id - Window ID
 * @property {string} className - Window class name
 */
interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onClick: () => void;
  onMinimize: () => void;
  onMinimizeComplete?: () => void;
  windowIndex: number;
  initialPosition?: {
    x: number;
    y: number;
    width?: string;
    height?: string;
  };
  isFullscreen?: boolean;
  defaultIsFullscreen?: boolean;
  className?: string;
}

// Add after the WindowProps interface
const minimizeVariants = {
  open: {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  minimized: (target: { x: number; y: number }) => ({
    scale: 0.5,
    opacity: 0,
    x: target.x,
    y: target.y,
    transition: { duration: 0.2, ease: "easeIn" }
  })
};

/**
 * Window Component
 * Provides a draggable, resizable window interface
 * @component
 */
export function Window({
  id,
  title,
  children,
  isActive,
  isMinimized,
  onClose,
  onClick,
  onMinimize,
  onMinimizeComplete,
  windowIndex,
  initialPosition,
  defaultIsFullscreen = false,
  className
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({
    x: initialPosition?.x || calculateNextPosition(windowIndex).x,
    y: initialPosition?.y || calculateNextPosition(windowIndex).y
  });
  const [size, setSize] = useState({ 
    width: initialPosition?.width ? parseInt(initialPosition.width) : 400, // Default width to 400px
    height: initialPosition?.height ? parseInt(initialPosition.height) : 200 // Default height to 200px
  });
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
        let newX = storedPosition.x + deltaX;
        let newY = storedPosition.y + deltaY;

        // Keep window within screen bounds
        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height;
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        setPosition({ x: newX, y: newY });
      }

      if (isResizing && resizeDirection) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        const newSize = { ...initialSize };
        const newPosition = { ...storedPosition };

        // Add bounds checking for resize
        if (resizeDirection.includes('e')) {
          newSize.width = Math.min(
            window.innerWidth - newPosition.x,
            Math.max(300, initialSize.width + deltaX)
          );
        }
        if (resizeDirection.includes('w')) {
          const maxWidth = storedPosition.x + initialSize.width;
          const newWidth = Math.max(300, initialSize.width - deltaX);
          newPosition.x = Math.max(0, Math.min(maxWidth - 300, storedPosition.x + (initialSize.width - newWidth)));
          newSize.width = newWidth;
        }
        if (resizeDirection.includes('s')) {
          newSize.height = Math.min(
            window.innerHeight - newPosition.y,
            Math.max(200, initialSize.height + deltaY)
          );
        }
        if (resizeDirection.includes('n')) {
          const maxHeight = storedPosition.y + initialSize.height;
          const newHeight = Math.max(200, initialSize.height - deltaY);
          newPosition.y = Math.max(0, Math.min(maxHeight - 200, storedPosition.y + (initialSize.height - newHeight)));
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
  }, [isDragging, isResizing, dragStart, storedPosition, initialSize, resizeDirection, size.width, size.height]);

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

  useEffect(() => {
    if (isActive) {
      windowRef.current?.focus();
    }
  }, [isActive]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMinimize();
  };

  if (isMinimized) {
    return null;
  }

  return (
    <motion.div
      initial={false}
      animate={isMinimized ? "minimized" : "open"}
      variants={minimizeVariants}
      custom={getMinimizeTarget(id, position)}
      onAnimationComplete={() => {
        if (isMinimized && onMinimizeComplete) {
          onMinimizeComplete();
        }
      }}
      style={{ position: 'fixed', zIndex: isActive ? 50 : windowIndex }}
    >
      <Card
        ref={windowRef}
        className={cn(
          "fixed bg-background border rounded-lg shadow-lg overflow-hidden select-none",
          isActive ? 'shadow-xl ring-2 ring-primary' : '',
          id === "terminal" ? "bg-black" : "bg-background",
          className
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isFullscreen ? '100vw' : `${size.width}px`,
          height: isFullscreen ? `calc(100vh - 48px)` : `${size.height}px`,
          zIndex: isActive ? 50 : windowIndex
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
              onClick={handleMinimize}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleFullscreen}
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
              onClick={handleClose}
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
    </motion.div>
  );
}

// Add these helper functions at the top of your file
const GRID_SIZE = 20; // pixels between each window position
const MAX_POSITIONS = 5; // how many positions before reset

const calculateNextPosition = (windowIndex: number) => {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  
  // Calculate random position within safe bounds
  const maxX = window.innerWidth - 800;  // 800 is default window width
  const maxY = window.innerHeight - 648;  // 600 + 48 for default height + taskbar
  
  const x = Math.max(0, Math.min(
    Math.floor(Math.random() * maxX),
    maxX
  ));
  
  const y = Math.max(0, Math.min(
    Math.floor(Math.random() * maxY),
    maxY
  ));
  
  return { x, y };
};

const getMinimizeTarget = (id: string, position: { x: number; y: number }) => {
  const taskbarIcon = document.querySelector(`[data-window-id="${id}"]`);
  if (taskbarIcon) {
    const rect = taskbarIcon.getBoundingClientRect();
    return {
      x: rect.left - position.x,
      y: window.innerHeight - position.y
    };
  }
  return {
    x: window.innerWidth / 2 - position.x,
    y: window.innerHeight - position.y
  };
};
