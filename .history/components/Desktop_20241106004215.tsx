"use client";

import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, AppWindow, Globe, LucideIcon, Trash } from "lucide-react"; 
import { GamesContent } from "./window-contents/GamesContent";
import { AppsContent } from "./window-contents/AppsContent";
import { PortfolioContent } from "./window-contents/PortfolioContent";
import { AboutContent } from "./window-contents/AboutContent";
import { ProjectsContent } from "./window-contents/ProjectsContent";
import { ExperienceContent } from "./window-contents/ExperienceContent";
import { ResumeContent } from "./window-contents/ResumeContent";
import { ContactContent } from "./window-contents/ContactContent";

/**
 * Window State Interface
 * @interface WindowState
 * @property {string} id - Unique identifier for the window
 * @property {boolean} isMinimized - Current minimize state
 * @property {number} zIndex - Current z-index for the window
 */
interface WindowState {
  id: string;
  isMinimized: boolean;
  zIndex: number;
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
    x: baseOffset + (index * 30),
    y: baseOffset + (index * 30),
    width: '1000px',  // Default width for other windows
    height: '800px'  // Default height for other windows
  };
};

/**
 * Desktop Component
 * Manages the main desktop interface including windows and icons
 * @component
 */
export function Desktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(0);

  const desktopIcons: DesktopIcon[] = [
    { id: "about", icon: User2, label: "About Me" },
    { id: "projects", icon: Code2, label: "Projects" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "resume", icon: FileText, label: "Resume" },
    { id: "contact", icon: Mail, label: "Contact" },
    { id: "games", icon: Gamepad2, label: "Games" },
    { id: "apps", icon: AppWindow, label: "AppWindow" },
    { id: "portfolio", icon: Globe, label: "Portfolio" },
  ];

  const handleIconClick = (id: string) => {
    const existingWindow = openWindows.find(window => window.id === id);
    
    if (existingWindow) {
      // Update z-index and minimize state for existing window
      setMaxZIndex(prev => prev + 1);
      setOpenWindows(prev => prev.map(window => 
        window.id === id 
          ? { ...window, isMinimized: false, zIndex: maxZIndex + 1 }
          : window
      ));
    } else {
      // Create new window with highest z-index
      setMaxZIndex(prev => prev + 1);
      setOpenWindows(prev => [...prev, { 
        id, 
        isMinimized: false, 
        zIndex: maxZIndex + 1 
      }]);
    }
    setActiveWindow(id);
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
          isActive={window.id === activeWindow}
          isMinimized={window.isMinimized}
          onClose={() => {
            setOpenWindows(prev => prev.filter(w => w.id !== window.id));
            if (activeWindow === window.id) {
              setActiveWindow(null);
            }
          }}
          onClick={() => {
            setMaxZIndex(prev => prev + 1);
            setOpenWindows(prev => prev.map(w => 
              w.id === window.id 
                ? { ...w, zIndex: maxZIndex + 1 }
                : w
            ));
            setActiveWindow(window.id);
          }}
          onMinimize={() => {
            setOpenWindows(prev =>
              prev.map(w =>
                w.id === window.id ? { ...w, isMinimized: !w.isMinimized } : w
              )
            );
          }}
          windowIndex={window.zIndex}
        >
          {/* Window Contents */}
          {window.id === "about" && <AboutContent />}
          {window.id === "projects" && <ProjectsContent />}
          {window.id === "experience" && <ExperienceContent />}
          {window.id === "resume" && <ResumeContent />}
          {window.id === "contact" && <ContactContent />}
          {window.id === "games" && <GamesContent />}
          {window.id === "apps" && <AppsContent />}
          {window.id === "portfolio" && <PortfolioContent />}
        </Window>
      ))}
    </div>
  );
}