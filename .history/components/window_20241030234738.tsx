"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Maximize2, Minimize2, X } from "lucide-react";

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
  const [position, setPosition] = useState({ x: 100, y: 50 });
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
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
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

  // Return null if window is minimized
  if (isMinimized) {
    return null;
  }

  return (
    <Card
      ref={windowRef}
      className={`fixed shadow-lg overflow-hidden transition-all duration-200 ${
        isActive ? 'shadow-xl ring-2 ring-primary' : ''
      } ${
        isFullscreen 
          ? 'w-screen h-[calc(100vh-48px)] left-0 top-0' 
          : 'w-[800px] h-[600px]'
      }`}
      style={
        !isFullscreen 
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`
            }
          : undefined
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
