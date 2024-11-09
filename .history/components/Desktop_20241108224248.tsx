"use client";

import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, AppWindow, Globe, LucideIcon } from "lucide-react"; 
import { GamesContent } from "./window-contents/GamesContent";
import { AppsContent } from "./window-contents/AppsContent";
import { PortfolioContent } from "./window-contents/PortfolioContent";
import { ResumeContent } from "./window-contents/ResumeContent";
import { AboutContent } from "./window-contents/AboutContent";
import { ContactContent } from "./window-contents/ContactContent";
import ExperienceContent from "./window-contents/ExperienceContent";

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
    { id: "portfolio", icon: Globe, label: "Portfolio" },
  ];

  const handleIconClick = (id: string) => {
    if (!openWindows.find(window => window.id === id)) {
      setOpenWindows(prev => [...prev, { id, isMinimized: false }]);
    }
  };

  return (
    <div className="fixed inset-0 bottom-12">
      <div className="grid grid-flow-col auto-cols-[100px] grid-rows-[repeat(auto-fill,100px)] gap-1 p-1 h-full">
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
          {window.id === "about" && <AboutContent />}
          {window.id === "projects" && <ProjectsContent />}
          {window.id === "experience" && <ExperienceContent />}
          {window.id === "resume" && <ResumeContent />}
          {window.id === "contact" && <ContactContent />}
          {window.id === "games" && <GamesContent />}
          {window.id === "apps" && <AppsContent />}
        </Window>
      ))}
    </div>
  );
}