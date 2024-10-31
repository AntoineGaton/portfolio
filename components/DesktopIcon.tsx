"use client";

import { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function DesktopIcon({ icon: Icon, label, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-24 flex-col items-center gap-1 rounded-lg p-2 text-white transition-colors hover:bg-white/10"
    >
      {Icon && <Icon className="h-10 w-10" />}
      <span className="text-sm font-medium text-center">{label}</span>
    </button>
  );
}