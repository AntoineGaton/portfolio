"use client";

import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, Apps } from "lucide-react";
import { GamesContent } from "./window-contents/GamesContent";
import { AppsContent } from "./window-contents/AppsContent";
import { PortfolioContent } from "./window-contents/PortfolioContent";

/**
 * Window State Interface
 * @interface WindowState
 * @property {string} id - Unique identifier for the window
 * @property {boolean} isMinimized - Current minimize state
 */
interface WindowState {
  id: string;
  isMinimized: boolean;
}

/**
 * Desktop Icon Configuration
 * @interface DesktopIcon
 * @property {string} id - Unique identifier for the icon
 * @property {LucideIcon} icon - Icon component to display
 * @property {string} label - Text label for the icon
 */
interface DesktopIcon {
  id: string;
  icon: LucideIcon;
  label: string;
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

  const desktopIcons: DesktopIcon[] = [
    { id: "about", icon: User2, label: "About" },
    { id: "projects", icon: Code2, label: "Projects" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "resume", icon: FileText, label: "Resume" },
    { id: "contact", icon: Mail, label: "Contact" },
    { id: "games", icon: Gamepad2, label: "Games" },
    { id: "apps", icon: Apps, label: "Apps" }
  ];

  const handleIconClick = (id: string) => {
    if (!openWindows.find(window => window.id === id)) {
      setOpenWindows(prev => [...prev, { id, isMinimized: false }]);
    }
  };

  return (
    <div className="h-[calc(100vh-48px)] w-full p-4">
      {/* Desktop Icons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 p-4">
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => handleIconClick(icon.id)}
          />
        ))}
      </div>

      {/* Open Windows */}
      {windows.map((window) => {
        const icon = icons.find(i => i.id === window.id);
        return (
          <Window
            key={window.id}
            initialPosition={window.position}
            title={icon?.label || ""}
            isActive={activeWindow === window.id}
            isMinimized={window.isMinimized}
            onClose={() => handleCloseWindow(window.id)}
            onClick={() => handleSetActiveWindow(window.id)}
            onMinimize={() => handleMinimizeWindow(window.id)}
          >
            {getWindowContent(window.id)}
          </Window>
        );
      })}
    </div>
  );
}