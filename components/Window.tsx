"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Maximize2, Minimize2, X } from "lucide-react";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onClick: () => void;
  onMinimize: () => void;
}

export function Window({
  title,
  children,
  isActive,
  isMinimized,
  onClose,
  onClick,
  onMinimize
}: WindowProps) {
  const [position, setPosition] = useState({ x: 100, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 100, y: 50 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Store previous position before going fullscreen
  const handleFullscreen = () => {
    if (!isFullscreen) {
      setPreviousPosition(position);
    } else {
      setPosition(previousPosition);
    }
    setIsFullscreen(!isFullscreen);
  };

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

  // Double click title bar to toggle fullscreen
  const handleDoubleClick = () => {
    handleFullscreen();
  };

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
      <div
        className="h-10 bg-background border-b flex items-center justify-between px-4 cursor-move"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <span className="font-medium">{title}</span>
        <div className="flex items-center gap-2">
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
      <div className="p-4 h-[calc(100%-2.5rem)] overflow-auto">
        {children}
      </div>
    </Card>
  );
}
