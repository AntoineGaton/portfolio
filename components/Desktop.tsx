"use client";

import { useState, useEffect } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, AppWindow, Globe, LucideIcon, Trash, File } from "lucide-react"; 
import { GamesContent } from "./window-contents/GamesContent";
import { AppsContent } from "./window-contents/AppsContent";
import { PortfolioContent } from "./window-contents/PortfolioContent";
import { ResumeContent } from "./window-contents/ResumeContent";
import { AboutContent } from "./window-contents/AboutContent";
import { ContactContent } from "./window-contents/ContactContent";
import { ExperienceContent } from "./window-contents/ExperienceContent";
import { ProjectsContent } from "./window-contents/ProjectsContent";
import { Terminal } from './Terminal';
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { ReadmeContent } from "./window-contents/ReadmeContent";
import { Taskbar } from "./Taskbar";
import { SettingsContent } from "./window-contents/SettingsContent";

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
const calculateNextPosition = (windowId: string, index: number) => {
  const baseOffset = 50;
  const offsetStep = 30;
  
  // Calculate position within safe bounds
  const maxX = typeof window !== 'undefined' ? window.innerWidth - 800 : 800;  // 800 is default window width
  const maxY = typeof window !== 'undefined' ? window.innerHeight - 648 : 600;  // 600 + 48 for default height + taskbar
  
  const x = Math.max(baseOffset, Math.min(
    baseOffset + (index * offsetStep),
    maxX
  ));
  
  const y = Math.max(baseOffset, Math.min(
    baseOffset + (index * offsetStep),
    maxY
  ));
  
  return {
    x,
    y,
    width: windowId === "experience" ? '770px' : '1000px'
  };
};

const getWindowSize = (id: string) => {
  switch (id) {
    case "experience":
      return { width: '770px', height: '900px' };
    case "about":
      return { width: '1000px', height: '800px' };
    case "portfolio":
      return { width: '100vw', height: '100vh' };
    case "readme":
      return { width: '800px', height: '600px' };
    case "contact":
      return { width: '500px', height: '600px' };
    case "projects":
      return { width: '900px', height: '700px' };
    case "terminal":
      return { width: '600px', height: '400px' };
    default:
      return { width: '400px', height: '200px' };
  }
};

const getWindowTitle = (id: string) => {
  switch (id) {
    case "about":
      return "About Me";
    default:
      return id.charAt(0).toUpperCase() + id.slice(1);
  }
};

const getWindowContent = (id: string) => {
  switch (id) {
    case "portfolio":
      return PortfolioContent;
    case "about":
      return AboutContent;
    case "projects":
      return ProjectsContent;
    case "experience":
      return ExperienceContent;
    case "resume":
      return ResumeContent;
    case "contact":
      return ContactContent;
    case "games":
      return GamesContent;
    case "apps":
      return AppsContent;
    case "terminal":
      return Terminal;
    case "readme":
      return ReadmeContent;
    case "settings":
      return SettingsContent;
    default:
      return () => <div>Unknown window content</div>;
  }
};

/**
 * Desktop Component
 * Manages the main desktop interface including windows and icons
 * @component
 */
export function Desktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  // Add debug logging for state changes
  useEffect(() => {
    console.log('Open windows:', openWindows);
  }, [openWindows]);

  useEffect(() => {
    console.log('Active window:', activeWindow);
  }, [activeWindow]);

  const desktopIcons: DesktopIcon[] = [
    { id: "about", icon: User2, label: "About Me" },
    { id: "projects", icon: Code2, label: "Projects" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "resume", icon: File, label: "Resume" },
    { id: "contact", icon: Mail, label: "Contact" },
    { id: "games", icon: Gamepad2, label: "Games" },
    { id: "apps", icon: AppWindow, label: "AppWindow" },
    { id: "portfolio", icon: Globe, label: "Portfolio" },
    { id: "readme", icon: FileText, label: "README" },
  ];

  const handleWindowOpen = (id: string) => {
    if (!openWindows.some(window => window.id === id)) {
      setOpenWindows(prev => [...prev, { id, isMinimized: false }]);
      setActiveWindow(id);
    } else {
      // If window exists but is minimized, restore it
      if (openWindows.find(window => window.id === id)?.isMinimized) {
        handleWindowRestore(id);
      }
      setActiveWindow(id);
    }
  };

  const handleWindowClose = (id: string) => {
    setOpenWindows(prev => prev.filter(window => window.id !== id));
    if (activeWindow === id) {
      const remainingWindows = openWindows.filter(window => window.id !== id && !window.isMinimized);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  const handleWindowMinimize = (id: string) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
    // Set active window to the next non-minimized window, if any
    const nextActiveWindow = openWindows.find(window => !window.isMinimized && window.id !== id);
    setActiveWindow(nextActiveWindow?.id || null);
  };

  const handleWindowRestore = (id: string) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: false } : window
    ));
    setActiveWindow(id);
  };

  const handleWindowClick = (id: string) => {
    setActiveWindow(id);
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
        setActiveWindow(windowId);
      }, 0);
    };

    window.addEventListener('openWindow', handleOpenWindow as EventListener);
    return () => {
      window.removeEventListener('openWindow', handleOpenWindow as EventListener);
    };
  }, [openWindows]); // Add openWindows as dependency

  return (
    <div className="h-screen overflow-hidden">
      <div className="grid grid-flow-col auto-cols-[100px] grid-rows-[repeat(auto-fill,100px)] gap-1 p-1 h-full">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => {
              console.log('Icon clicked:', icon.id);
              handleWindowOpen(icon.id);
            }}
          />
        ))}
      </div>

      {openWindows.map((window, index) => {
        const WindowContent = getWindowContent(window.id);
        const initialPos = calculateNextPosition(window.id, index);
        return (
          <Window
            key={window.id}
            id={window.id}
            title={getWindowTitle(window.id)}
            isActive={activeWindow === window.id}
            isMinimized={window.isMinimized}
            onClose={() => handleWindowClose(window.id)}
            onClick={() => handleWindowClick(window.id)}
            onMinimize={() => handleWindowMinimize(window.id)}
            windowIndex={index}
            initialPosition={initialPos}
          >
            <WindowContent />
          </Window>
        );
      })}

      <Taskbar
        openWindows={openWindows}
        onWindowRestore={handleWindowRestore}
        onWindowOpen={handleWindowOpen}
      />
    </div>
  );
}