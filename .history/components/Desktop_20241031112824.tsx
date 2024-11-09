"use client";

import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { Browser } from "./Browser";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, AppWindow, Chrome } from "lucide-react";
import { GamesContent } from "./window-contents/GamesContent";
import { AppsContent } from "./window-contents/AppsContent";
import { PortfolioContent } from "./window-contents/PortfolioContent";
import type { LucideIcon } from "lucide-react";

interface WindowState {
  id: string;
  isMinimized: boolean;
  type: 'browser' | 'window';
  zIndex: number;
}

interface DesktopIconConfig {
  id: string;
  icon: LucideIcon;
  label: string;
  type: 'browser' | 'window';
}

const desktopIcons: DesktopIconConfig[] = [
  { id: "portfolio", icon: Chrome, label: "Portfolio", type: 'browser' },
  { id: "games", icon: Gamepad2, label: "Games", type: 'window' },
  { id: "apps", icon: AppWindow, label: "Apps", type: 'window' },
];

const calculateNextPosition = (index: number) => {
  const baseOffset = 50;
  return {
    x: baseOffset + (index * 30),
    y: baseOffset + (index * 30)
  };
};

export function Desktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);

  const desktopIcons: DesktopIcon[] = [
    { id: "about", icon: User2, label: "About" },
    { id: "projects", icon: Code2, label: "Projects" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "resume", icon: FileText, label: "Resume" },
    { id: "contact", icon: Mail, label: "Contact" },
    { id: "games", icon: Gamepad2, label: "Games" },
    { id: "apps", icon: AppWindow, label: "Apps" },
    { id: "portfolio", icon: Chrome, label: "Portfolio" },
  ];
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(0);

  const handleIconClick = (id: string) => {
    const icon = desktopIcons.find(icon => icon.id === id);
    if (!icon) return;

    if (!openWindows.find(window => window.id === id)) {
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      setOpenWindows(prev => [...prev, { 
        id, 
        isMinimized: false,
        type: icon.type,
        zIndex: newZIndex
      }]);
    }
    setActiveWindowId(id);
  };

  const handleWindowClick = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setOpenWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { ...window, zIndex: newZIndex }
          : window
      )
    );
    setActiveWindowId(id);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 gap-4">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => handleIconClick(icon.id)}
          />
        ))}
      </div>

      {openWindows.map((window) => {
        const isActive = activeWindowId === window.id;
        const commonProps = {
          key: window.id,
          title: window.id.charAt(0).toUpperCase() + window.id.slice(1),
          isActive,
          isMinimized: window.isMinimized,
          onClose: () => setOpenWindows(prev => prev.filter(w => w.id !== window.id)),
          onClick: () => handleWindowClick(window.id),
          onMinimize: () => {
            setOpenWindows(prev =>
              prev.map(w =>
                w.id === window.id ? { ...w, isMinimized: !w.isMinimized } : w
              )
            );
          },
          windowIndex: window.zIndex,
          initialPosition: window.id === "portfolio" 
            ? { x: 0, y: 0 }
            : calculateNextPosition(openWindows.indexOf(window)),
          style: { zIndex: window.zIndex }
        };

        return window.type === 'browser' ? (
          <Browser {...commonProps}>
            {window.id === "portfolio" && <PortfolioContent />}
          </Browser>
        ) : (
          <Window {...commonProps}>
            {window.id === "games" && <GamesContent />}
            {window.id === "apps" && <AppsContent />}
          </Window>
        );
      })}
    </div>
  );
}