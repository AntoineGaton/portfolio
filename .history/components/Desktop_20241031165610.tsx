"use client";

import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, AppWindow, Chrome, LucideIcon } from "lucide-react"; 
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
    { id: "apps", icon: AppWindow, label: "AppWindow" },
    { id: "portfolio", icon: Chrome, label: "Portfolio" },
  ];

  const handleIconClick = (id: string) => {
    if (!openWindows.find(window => window.id === id)) {
      setOpenWindows(prev => [...prev, { id, isMinimized: false }]);
    }
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

      {openWindows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.id.charAt(0).toUpperCase() + window.id.slice(1)}
          isActive={true}
          isMinimized={window.isMinimized}
          isFullscreen={window.id === "portfolio"}
          onClose={() => setOpenWindows(prev => prev.filter(w => w.id !== window.id))}
          onClick={() => {}}
          onMinimize={() => {
            setOpenWindows(prev =>
              prev.map(w =>
                w.id === window.id ? { ...w, isMinimized: !w.isMinimized } : w
              )
            );
          }}
          windowIndex={openWindows.indexOf(window)}
          initialPosition={window.id === "portfolio" ? 
            { x: 0, y: 0, width: '100vw', height: '100vh' } : 
            calculateNextPosition(openWindows.indexOf(window))
          }
        >
          {window.id === "portfolio" && <PortfolioContent />}
          {window.id === "games" && <GamesContent />}
          {window.id === "apps" && <AppsContent />}
        </Window>
      ))}
    </div>
  );
}