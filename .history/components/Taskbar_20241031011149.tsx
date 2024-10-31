/**
 * Taskbar Component
 * Provides system-wide controls and window management
 * @component
 */
  "use client";

import { Button } from "@/components/ui/button";
import { Monitor, Mail, Folder, Terminal, Github, Chrome, Wifi, Battery, Sun, Search, User2, Code2, Briefcase, FileText, FolderGames2, Windows } from "lucide-react";
import { useState, useEffect } from "react";
import { CenterMenu } from "./CenterMenu";
import { Clock } from "./clock";
import { useTheme } from "next-themes";
import { TaskbarIcon } from "./TaskbarIcon";

/**
 * Taskbar Props Interface
 * @interface TaskbarProps
 * @property {Array<{id: string, isMinimized: boolean}>} openWindows - Currently open windows
 * @property {(id: string) => void} onWindowRestore - Handler for restoring minimized windows
 */
export interface TaskbarProps {
  openWindows: Array<{ id: string; isMinimized: boolean }>;
  onWindowRestore: (id: string) => void;
}

/**
 * Weather State Interface
 * @interface WeatherState
 * @property {number} temp - Temperature in Fahrenheit
 * @property {string} condition - Weather condition description
 */
interface WeatherState {
  temp: number;
  condition: string;
}

/**
 * Taskbar Component
 * Provides system-wide controls and window management
 * @component
 */
export function Taskbar({ openWindows = [], onWindowRestore }: TaskbarProps) {
  // State management
  const [centerMenuOpen, setCenterMenuOpen] = useState(false);
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const { theme, setTheme } = useTheme();

  /**
   * Maps window IDs to their corresponding icons
   * @param {string} id - Window identifier
   * @returns {LucideIcon} Corresponding icon component
   */
  const getIconForWindow = (id: string) => {
    switch (id) {
      case "about": return User2;
      case "projects": return Code2;
      case "experience": return Briefcase;
      case "resume": return FileText;
      case "contact": return Mail;
      case "games": return FolderGames2;
      default: return Monitor;
    }
  };

  /**
   * Fetches weather information
   * Currently uses mock data, can be connected to real API
   */
  useEffect(() => {
    const getWeather = async () => {
      try {
        // Mock weather data - replace with actual API call
        const mockWeather = { temp: 72, condition: "Partly Cloudy" };
        setWeather(mockWeather);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    getWeather();
  }, []);

  /**
   * Handles clicking outside center menu to close it
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.center-menu') && !target.closest('.monitor-button')) {
        setCenterMenuOpen(false);
      }
    };

    if (centerMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [centerMenuOpen]);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-sm border-t flex items-center justify-between px-2 sm:px-4">
        <div className="flex items-center gap-2">
          {/* Start button */}
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Windows className="h-5 w-5" />
          </Button>
          
          {/* Search - hide on mobile */}
          <div className="hidden md:flex items-center gap-2">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none focus:outline-none w-32 lg:w-48"
            />
          </div>
        </div>
        
        {/* Center section - show fewer items on mobile */}
        <div className="flex-1 flex justify-center gap-1 sm:gap-2">
          {openWindows.map((window) => {
            const Icon = getIconForWindow(window.id);
            return (
              <TaskbarIcon
                key={window.id}
                icon={Icon}
                isMinimized={window.isMinimized}
                onClick={() => onWindowRestore(window.id)}
              />
            );
          })}
        </div>
        
        {/* Right section - show fewer controls on mobile */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Wifi className="h-4 w-4" />
          </Button>
          <Clock />
        </div>
      </div>

      {/* Center Menu Overlay */}
      {centerMenuOpen && (
        <div className="center-menu">
          <CenterMenu onClose={() => setCenterMenuOpen(false)} />
        </div>
      )}
    </>
  );
}