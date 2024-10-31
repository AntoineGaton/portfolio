"use client";

import { Button } from "@/components/ui/button";
import { Monitor, Mail, Folder, Terminal, Github, Chrome, Wifi, Battery, Sun, Search, User2, Code2, Briefcase, FileText, FolderGames2 } from "lucide-react";
import { useState, useEffect } from "react";
import { CenterMenu } from "./CenterMenu";
import { Clock } from "./Clock";
import { useTheme } from "next-themes";
import { TaskbarIcon } from "./TaskbarIcon";

interface TaskbarProps {
  openWindows: Array<{ id: string; isMinimized: boolean }>;
  onWindowRestore: (id: string) => void;
}

export function Taskbar({ openWindows = [], onWindowRestore }: TaskbarProps) {
  const [centerMenuOpen, setCenterMenuOpen] = useState(false);
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);
  const { theme, setTheme } = useTheme();

  const getIconForWindow = (id: string) => {
    switch (id) {
      case "about":
        return User2;
      case "projects":
        return Code2;
      case "experience":
        return Briefcase;
      case "resume":
        return FileText;
      case "contact":
        return Mail;
      case "games":
        return FolderGames2;
      default:
        return Monitor;
    }
  };

  useEffect(() => {
    const getWeather = async () => {
      try {
        const mockWeather = { temp: 72, condition: "Partly Cloudy" };
        setWeather(mockWeather);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    getWeather();
  }, []);

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
          <div className="flex items-center gap-4">
            {weather && (
              <div className="flex items-center gap-2 text-sm">
                <Sun className="h-4 w-4" />
                <span>{weather.temp}°F</span>
                <span>{weather.condition}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="monitor-button"
              onClick={() => setCenterMenuOpen(!centerMenuOpen)}
            >
              <Monitor className="h-5 w-5" />
            </Button>

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

            <div className="relative flex items-center mx-2 h-8">
              <Search className="absolute left-2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Type to search"
                className="h-full w-[200px] rounded-md bg-secondary/50 pl-8 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                readOnly
              />
            </div>

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
          
          <div className="flex items-center gap-4 pr-4">
            <Button variant="ghost" size="icon">
              <Wifi className="h-4 w-4" />
            </Button>
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
      {centerMenuOpen && (
        <div className="center-menu">
          <CenterMenu onClose={() => setCenterMenuOpen(false)} />
        </div>
      )}
    </>
  );
}