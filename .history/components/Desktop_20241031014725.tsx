"use client";

import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, Apps } from "lucide-react";
import { GamesContent } from "./window-contents/GamesContent";
import { AppsContent } from "./window-contents/AppsContent";

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

/**
 * Desktop Component
 * Manages the main desktop interface including windows and icons
 * @component
 */
export function Desktop() {
  // State management for windows
  const [windows, setWindows] = useState<Array<{
    id: string;
    isMinimized: boolean;
    position: { x: number; y: number };
  }>>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  /**
   * Desktop icons configuration
   * Defines all available desktop shortcuts
   */
  const icons = [
    { id: "about", icon: User2, label: "About Me" },
    { id: "projects", icon: Code2, label: "Projects" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "resume", icon: FileText, label: "Resume" },
    { id: "contact", icon: Mail, label: "Contact" },
    { id: "games", icon: Gamepad2, label: "Games" },
    { id: "apps", icon: Apps, label: "Apps" }
  ];

  /**
   * Handles desktop icon click events
   * Opens new window or restores minimized window
   * @param {string} id - Icon identifier
   */
  const handleIconClick = (id: string) => {
    openWindow(id);
  };

  /**
   * Handles window close events
   * Removes window from open windows and updates active window
   * @param {string} id - Window identifier
   */
  const handleCloseWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  /**
   * Handles window minimize events
   * Updates window state and active window focus
   * @param {string} id - Window identifier
   */
  const handleMinimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  /**
   * Dynamically loads and returns window content based on window ID
   * Uses code splitting for better performance
   * @param {string} id - Window identifier
   * @returns {ReactNode} Window content component
   */
  const getWindowContent = (id: string) => {
    switch (id) {
      case "games":
        return <GamesContent />;
      case "apps":
        return <AppsContent />;
      case "about":
        const AboutContent = require(`./window-contents/AboutContent`).default;
        return <AboutContent />;
      case "projects":
        const ProjectsContent = require(`./window-contents/ProjectsContent`).default;
        return <ProjectsContent />;
      case "experience":
        const ExperienceContent = require(`./window-contents/ExperienceContent`).default;
        return <ExperienceContent />;
      case "resume":
        const ResumeContent = require(`./window-contents/ResumeContent`).default;
        return <ResumeContent />;
      case "contact":
        const ContactContent = require(`./window-contents/ContactContent`).default;
        return <ContactContent />;
      default:
        return null;
    }
  };

  const getWindowPosition = () => {
    // Calculate a position within the safe bounds of the viewport
    const padding = 50;
    const maxX = window.innerWidth - 500 - padding;  // 500 = approx window width
    const maxY = window.innerHeight - 400 - padding; // 400 = approx window height
    
    return {
      x: Math.max(padding, Math.floor(Math.random() * maxX)),
      y: Math.max(padding, Math.floor(Math.random() * maxY))
    };
  };

  const openWindow = (id: string) => {
    setWindows(prev => [
      ...prev,
      {
        id,
        isMinimized: false,
        position: getWindowPosition()
      }
    ]);
  };

  const handleSetActiveWindow = (id: string) => {
    setActiveWindow(id);
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
            className="w-full sm:w-auto"
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