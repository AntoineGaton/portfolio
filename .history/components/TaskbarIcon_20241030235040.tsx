"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

/**
 * TaskbarIcon Props Interface
 * @interface TaskbarIconProps
 * @property {LucideIcon} icon - Icon component to display
 * @property {boolean} isMinimized - Whether the corresponding window is minimized
 * @property {() => void} onClick - Click handler
 */
interface TaskbarIconProps {
  icon: LucideIcon;
  isMinimized: boolean;
  onClick: () => void;
}

/**
 * TaskbarIcon Component
 * Represents a window in the taskbar
 * @component
 */
export function TaskbarIcon({ icon: Icon, isMinimized, onClick }: TaskbarIconProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      {/* Minimized indicator dot */}
      {isMinimized && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
      )}
    </Button>
  );
}