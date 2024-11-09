"use client";
import { Button } from "@/components/ui/button";
import { Monitor, Mail, Folder, Terminal, Github, Chrome, Battery, Sun, Search, User2, Code2, Briefcase, FileText, Gamepad2, ChevronUp, Volume2, AppWindow, Maximize, Minimize2, Wifi, WifiHigh, WifiLow } from "lucide-react";
import { useState, useEffect } from "react";
import { CenterMenu } from "./CenterMenu";
import { Clock } from "./Clock";
import { useTheme } from "next-themes";
import { TaskbarIcon } from "./TaskbarIcon";
import { BatteryLow, BatteryMedium, BatteryCharging } from "lucide-react";

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wifiStatus, setWifiStatus] = useState<'high' | 'medium' | 'low' | 'off'>('high');
  const [batteryStatus, setBatteryStatus] = useState<'high' | 'medium' | 'low' | 'charging'>('high');

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
      case "games": return Gamepad2;
      case "app": return AppWindow;
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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.log(`Error attempting to exit full-screen mode: ${err.message}`);
      });
    }
  };

  // Function to get random status
  const getRandomStatus = (type: 'wifi' | 'battery') => {
    const statuses = type === 'wifi' 
      ? ['high', 'medium', 'low', 'off'] 
      : ['high', 'medium', 'low', 'charging'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex] as any;
  };

  // Effect to update statuses every 5 minutes
  useEffect(() => {
    // Set initial random states
    setWifiStatus(getRandomStatus('wifi'));
    setBatteryStatus(getRandomStatus('battery'));

    const interval = setInterval(() => {
      setWifiStatus(getRandomStatus('wifi'));
      setBatteryStatus(getRandomStatus('battery'));
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  // Helper function to get the correct WiFi icon
  const getWifiIcon = () => {
    switch (wifiStatus) {
      case 'high': return <Wifi className="h-4 w-4" />;
      case 'medium': return <WifiHigh className="h-4 w-4" />;
      case 'low': return <WifiLow className="h-4 w-4" />;
    }
  };

  // Helper function to get the correct Battery icon
  const getBatteryIcon = () => {
    switch (batteryStatus) {
      case 'high': return <Battery className="h-4 w-4" />;
      case 'medium': return <BatteryMedium className="h-4 w-4" />;
      case 'low': return <BatteryLow className="h-4 w-4" />;
      case 'charging': return <BatteryCharging className="h-4 w-4" />;
    }
  };

  const getWifiColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-orange-500';
      case 'off': return 'text-red-500';
      default: return '';
    }
  };

  const getBatteryColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-red-500';
      case 'charging': return 'text-blue-500';
      default: return '';
    }
  };

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 right-0 h-12 bg-background border-t border-black-500/30"
        style={{ zIndex: 50 }}
      >
        <div className="flex items-center justify-between h-full px-2">
          {/* Left Section - Weather */}
          <div className="flex items-center gap-4">
            {weather && (
              <div className="flex items-center gap-2 text-sm text-white-500">
                <Sun className="h-4 w-4 text-white-500" />
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

            {/* Minimized Windows Icons */}
            {openWindows.filter(window => window.isMinimized).map((window) => {
              const Icon = getIconForWindow(window.id);
              return (
                <TaskbarIcon
                  key={window.id}
                  id={window.id}
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
            <Button 
              variant="ghost" 
              size="icon"
              asChild
            >
              <a href="mailto:swe.antoine.gaton@gmail.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              asChild
            >
              <a href="/documents/Antoine_Gaton_Resume" download>
                <FileText className="h-5 w-5" />
              </a>
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              asChild
            >
              <a href="https://replit.com/@AntoineGaton" target="_blank" rel="noopener noreferrer">
                <Terminal className="h-5 w-5" />
              </a>
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              asChild
            >
              <a href="https://github.com/AntoineGaton" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              asChild
            >
              <a href="https://www.linkedin.com/in/antoine-gaton/" target="_blank" rel="noopener noreferrer">
                <Chrome className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          {/* Right Section - System Controls */}
          <div className="flex items-center gap-0.5">
            {/* System Tray Icons */}
            <div className="flex items-center">
              {/* <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                <ChevronUp className="h-4 w-4" />
              </Button> */}

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0 relative group"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <>
                    <Maximize className="h-4 w-4" />
                    <span className="absolute inset-0 rounded-sm animate-ping bg-primary/20 group-hover:bg-transparent" />
                  </>
                )}
              </Button>

            </div>

            {/* Network, Sound, Battery Group */}
            <div className="flex items-center px-1 hover:bg-accent rounded-sm">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 px-0 relative group"
                title={`WiFi: ${wifiStatus}`}
              >
                <div className={getWifiColor(wifiStatus)}>{getWifiIcon()}</div>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  WiFi: {wifiStatus}
                </span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 px-0 relative group"
                title={`Battery Status: ${batteryStatus}`}
              >
                <div className={getBatteryColor(batteryStatus)}>{getBatteryIcon()}</div>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Battery: {batteryStatus}
                </span>
              </Button>
            </div>

            {/* Date/Time */}
            <div className="flex items-center px-2 hover:bg-accent rounded-sm min-w-[120px] h-full">
              <Clock />
            </div>
            
            {/* Show Desktop Button */}
            <div className="w-px h-full hover:bg-accent" />
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