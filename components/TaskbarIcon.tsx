"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface TaskbarIconProps {
  icon: LucideIcon;
  isMinimized: boolean;
  onClick: () => void;
}

export function TaskbarIcon({ icon: Icon, isMinimized, onClick }: TaskbarIconProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      {isMinimized && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
      )}
    </Button>
  );
}