"use client";

import { useState, useEffect } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, AppWindow, Globe, LucideIcon, Trash } from "lucide-react"; 
import { GamesContent } from "./window-contents/GamesContent";
import { AppsContent } from "./window-contents/AppsContent";
import { PortfolioContent } from "./window-contents/PortfolioContent";
import { ResumeContent } from "./window-contents/ResumeContent";
import { AboutContent } from "./window-contents/AboutContent";
import { ContactContent } from "./window-contents/ContactContent";
import { ExperienceContent } from "./window-contents/ExperienceContent";
import { ProjectsContent } from "./window-contents/ProjectsContent";

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
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  // Add debug logging for state changes
  useEffect(() => {
    console.log('Open windows:', openWindows);
  }, [openWindows]);

  useEffect(() => {
    console.log('Active window:', activeWindowId);
  }, [activeWindowId]);

  const desktopIcons: DesktopIcon[] = [
    { id: "about", icon: User2, label: "About Me" },
    { id: "projects", icon: Code2, label: "Projects" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "resume", icon: FileText, label: "Resume" },
    { id: "contact", icon: Mail, label: "Contact" },
    { id: "games", icon: Gamepad2, label: "Games" },
    { id: "apps", icon: AppWindow, label: "AppWindow" },
    { id: "portfolio", icon: Globe, label: "Portfolio" },
    // { id: "trash", icon: Trash, label: "Trash" },
  ];

  const handleIconClick = (id: string) => {
    console.log('handleIconClick called with id:', id); // Debug log
    
    if (!openWindows.find(window => window.id === id)) {
      console.log('Creating new window for:', id); // Debug log
      setOpenWindows(prev => {
        const newWindows = [...prev, { id, isMinimized: false }];
        console.log('New windows state:', newWindows); // Debug log
        return newWindows;
      });
      setActiveWindowId(id);
    } else {
      console.log('Window exists, updating:', id); // Debug log
      setOpenWindows(prev => prev.map(window => 
        window.id === id ? { ...window, isMinimized: false } : window
      ));
      setActiveWindowId(id);
    }
  };

  useEffect(() => {
    const handleOpenWindow = (event: CustomEvent<{ windowId: string, makeActive: boolean }>) => {
      const { windowId, makeActive } = event.detail;
      
      // Check if window exists
      const existingWindow = openWindows.find(window => window.id === windowId);
      
      if (!existingWindow) {
        // Create new window
        setOpenWindows(prev => [...prev, { id: windowId, isMinimized: false }]);
      } else {
        // Update existing window
        setOpenWindows(prev => prev.map(window => 
          window.id === windowId ? { ...window, isMinimized: false } : window
        ));
      }
      
      // Set active window with a slight delay to ensure state is updated
      setTimeout(() => {
        setActiveWindowId(windowId);
      }, 0);
    };

    window.addEventListener('openWindow', handleOpenWindow as EventListener);
    return () => {
      window.removeEventListener('openWindow', handleOpenWindow as EventListener);
    };
  }, [openWindows]); // Add openWindows as dependency

  return (
    <div className="fixed inset-0 bottom-12">
      <div className="grid grid-flow-col auto-cols-[100px] grid-rows-[repeat(auto-fill,100px)] gap-1 p-1 h-full">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => {
              console.log('Icon clicked:', icon.id); // Debug log
              handleIconClick(icon.id);
            }}
          />
        ))}
      </div>

      {openWindows.map((window) => {
        console.log('Rendering window:', window.id); // Debug log
        return (
          <Window
            key={window.id}
            id={window.id}
            title={window.id === "about" ? "About Me" : window.id.charAt(0).toUpperCase() + window.id.slice(1)}
            isActive={activeWindowId === window.id}
            isMinimized={window.isMinimized}
            isFullscreen={window.id === "portfolio"}
            onClose={() => {
              console.log('Closing window:', window.id); // Debug log
              setOpenWindows(prev => prev.filter(w => w.id !== window.id));
              if (activeWindowId === window.id) {
                setActiveWindowId(null);
              }
            }}
            onClick={() => setActiveWindowId(window.id)}
            onMinimize={() => {
              console.log('Minimizing window:', window.id); // Debug log
              setOpenWindows(prev =>
                prev.map(w =>
                  w.id === window.id ? { ...w, isMinimized: !w.isMinimized } : w
                )
              );
            }}
            windowIndex={openWindows.indexOf(window)}
            initialPosition={
              window.id === "about" ? 
                { x: 50, y: 50, width: '1000px', height: '800px' } :
              window.id === "portfolio" ? 
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
            {window.id === "portfolio" && <PortfolioContent />}
          </Window>
        );
      })}
    </div>
  );
}