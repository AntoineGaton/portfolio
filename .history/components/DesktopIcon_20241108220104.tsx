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
      className="flex flex-col items-center justify-center p-2 rounded hover:bg-white/10 focus:bg-white/10 group h-[100px] w-[100px]"
    >
      <Icon className="h-10 w-10 text-white group-hover:text-white/90" />
      <span className="mt-1 text-xs text-white text-center break-words w-full px-1">
        {label}
      </span>
    </button>
  );
}