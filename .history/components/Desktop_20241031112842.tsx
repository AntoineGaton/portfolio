"use client";

import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { 
  User2, 
  Code2, 
  Briefcase, 
  FileText, 
  Mail, 
  Gamepad2, 
  AppWindow, 
  Chrome,
  Calculator,
  Cloud
} from "lucide-react";
import { GamesContent } from "./window-contents/GamesContent";
import { AppsContent } from "./window-contents/AppsContent";
import { PortfolioContent } from "./window-contents/PortfolioContent";
import type { LucideIcon } from "lucide-react";

/**
 * Window State Interface
 * @interface WindowState
 * @property {string} id - Unique identifier for the window
 * @property {boolean} isMinimized - Current minimize state
 * @property {string} type - Type of the window
 */
interface WindowState {
  id: string;
  isMinimized: boolean;
  type: 'browser' | 'window';
}

/**
 * Desktop Icon Configuration
 * @interface DesktopIconConfig
 * @property {string} id - Unique identifier for the icon
 * @property {LucideIcon} icon - Icon component to display
 * @property {string} label - Text label for the icon
 * @property {string} type - Type of the window
 * @property {LucideIcon[]} apps - Array of apps for the window
 */
interface DesktopIconConfig {
  id: string;
  icon: LucideIcon;
  label: string;
  type: 'browser' | 'window';
  apps?: {
    id: string;
    icon: LucideIcon;
    label: string;
  }[];
}

// Add this function before the Desktop component
const calculateNextPosition = (index: number) => {
  const baseOffset = 50; // Base offset in pixels
  return {
    x: baseOffset + (index * 30), // Increment x position for each window
    y: baseOffset + (index * 30), // Increment y position for each window
  };
};

/**
 * Desktop Component
 * Manages the main desktop interface including windows and icons
 * @component
 */
export function Desktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const desktopIcons: DesktopIconConfig[] = [
    { 
      id: "portfolio", 
      icon: Chrome, 
      label: "Portfolio", 
      type: 'browser' 
    },
    { 
      id: "games", 
      icon: Gamepad2, 
      label: "Games", 
      type: 'window',
      apps: [
        { id: "snake", icon: Gamepad2, label: "Snake" },
        { id: "tetris", icon: Gamepad2, label: "Tetris" },
        { id: "pong", icon: Gamepad2, label: "Pong" }
      ]
    },
    { 
      id: "apps", 
      icon: AppWindow, 
      label: "Apps", 
      type: 'window',
      apps: [
        { id: "calculator", icon: Calculator, label: "Calculator" },
        { id: "notepad", icon: FileText, label: "Notepad" },
        { id: "weather", icon: Cloud, label: "Weather" }
      ]
    }
  ];

  const handleIconClick = (id: string) => {
    const icon = desktopIcons.find(icon => icon.id === id);
    if (!icon) return;

    if (!openWindows.find(window => window.id === id)) {
      setOpenWindows(prev => [...prev, { 
        id, 
        isMinimized: false,
        type: icon.type
      }]);
    }
    setActiveWindowId(id);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Desktop Icons */}
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

      {/* Windows */}
      {openWindows.map((window) => {
        const isActive = activeWindowId === window.id;
        const commonProps = {
          key: window.id,
          title: window.id.charAt(0).toUpperCase() + window.id.slice(1),
          isActive,
          isMinimized: window.isMinimized,
          onClose: () => setOpenWindows(prev => prev.filter(w => w.id !== window.id)),
          onClick: () => setActiveWindowId(window.id),
          onMinimize: () => {
            setOpenWindows(prev =>
              prev.map(w =>
                w.id === window.id ? { ...w, isMinimized: !w.isMinimized } : w
              )
            );
          },
          windowIndex: openWindows.indexOf(window),
          initialPosition: window.id === "portfolio" 
            ? { x: 0, y: 0 }
            : calculateNextPosition(openWindows.indexOf(window))
        };

        return window.type === 'browser' ? (
          <Browser {...commonProps}>
            {window.id === "portfolio" && <PortfolioContent />}
          </Browser>
        ) : (
          <Window {...commonProps}>
            {window.id === "games" && <GamesContent />}
            {window.id === "apps" && (
              <AppsContent 
                apps={desktopIcons.find(icon => icon.id === "apps")?.apps || []}
              />
            )}
          </Window>
        );
      })}
    </div>
  );
}