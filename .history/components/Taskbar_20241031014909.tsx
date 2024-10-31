"use client";

import { Button } from "@/components/ui/button";
import { Monitor, Mail, Folder, Terminal, Github, Chrome, Wifi, Battery, Sun, Search, User2, Code2, Briefcase, FileText, FolderGames2 } from "lucide-react";
import { useState, useEffect } from "react";
import { CenterMenu } from "./CenterMenu";
import { Clock } from "./Clock";
import { useTheme } from "next-themes";
import { TaskbarIcon } from "./TaskbarIcon";

/**
 * Taskbar Props Interface
 * @interface TaskbarProps
 * @property {Array<{id: string, isMinimized: boolean}>} openWindows - Currently open windows
 * @property {(id: string) => void} onWindowRestore - Handler for restoring minimized windows
 */
interface TaskbarProps {
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
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-lg border-t">
        <div className="flex items-center justify-between h-full px-2">
          {/* Left Section - Weather */}
          <div className="flex items-center gap-4">
            {weather && (
              <div className="flex items-center gap-2 text-sm">
                <Sun className="h-4 w-4" />
                <span>{weather.temp}°F</span>
                <span>{weather.condition}</span>
              </div>
            )}
          </div>

          {/* Center Section - Open Windows and Quick Actions */}
          <div className="flex items-center gap-1">
            {/* Center Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="monitor-button"
              onClick={() => setCenterMenuOpen(!centerMenuOpen)}
            >
              <Monitor className="h-5 w-5" />
            </Button>

            {/* Open Windows */}
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

            {/* Search Bar */}
            <div className="relative flex items-center mx-2 h-8">
              <Search className="absolute left-2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Type to search"
                className="h-full w-[200px] rounded-md bg-secondary/50 pl-8 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                readOnly
              />
            </div>

            {/* Quick Access Icons */}
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Folder className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Terminal className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Chrome className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Right Section - System Controls */}
          <div className="flex space- gap-1 pr-4">
            <Button variant="ghost" size="icon">
              <Battery className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Clock />
          </div>
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