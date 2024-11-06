"use client";
import { useState, useEffect } from "react";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, LayoutGrid, Battery, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { RGBBackground } from "./RGBBackground";

// Dynamically import content components
const AboutContent = dynamic(() => import("./window-contents/AboutContent").then(mod => ({ default: mod.AboutContent })));
const ProjectsContent = dynamic(() => import("./window-contents/ProjectsContent").then(mod => ({ default: mod.ProjectsContent })));
const ExperienceContent = dynamic(() => import("./window-contents/ExperienceContent").then(mod => ({ default: mod.ExperienceContent })));
const ResumeContent = dynamic(() => import("./window-contents/ResumeContent").then(mod => ({ default: mod.ResumeContent })));
const ContactContent = dynamic(() => import("./window-contents/ContactContent").then(mod => ({ default: mod.ContactContent })));
const GamesContent = dynamic(() => import("./window-contents/GamesContent").then(mod => ({ default: mod.GamesContent })));
const AppsContent = dynamic(() => import("./window-contents/AppsContent").then(mod => ({ default: mod.AppsContent })));

interface AppIcon {
  id: string;
  icon: typeof User2;
  label: string;
  component: React.ComponentType;
}

export const MobileLayout = () => {
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  }));

  const [signalStrength, setSignalStrength] = useState(Math.floor(Math.random() * 3)); // 0-2
  const [wifiStrength, setWifiStrength] = useState(Math.floor(Math.random() * 3)); // 0-2
  const [batteryLevel, setBatteryLevel] = useState(Math.floor(Math.random() * 3)); // 0-2

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const apps: AppIcon[] = [
    { id: "about", icon: User2, label: "About Me", component: AboutContent },
    { id: "projects", icon: Code2, label: "Projects", component: ProjectsContent },
    { id: "experience", icon: Briefcase, label: "Experience", component: ExperienceContent },
    { id: "resume", icon: FileText, label: "Resume", component: ResumeContent },
    { id: "contact", icon: Mail, label: "Contact", component: ContactContent },
    { id: "games", icon: Gamepad2, label: "Games", component: GamesContent },
    { id: "apps", icon: LayoutGrid, label: "Apps", component: AppsContent }
  ];

  const handleAppClick = (id: string) => {
    // Start opening animation
    setIsAnimating(true);
    // Set the app after a small delay to ensure animation plays
    setTimeout(() => {
      setOpenApp(id);
      setIsAnimating(false);
    }, 50);
  };

  const handleClose = () => {
    // Start closing animation
    setIsAnimating(true);
    // Clear the app after animation completes
    setTimeout(() => {
      setOpenApp(null);
      setIsAnimating(false);
    }, 300); // Match this with your CSS transition duration
  };

  return (
    <div className="min-h-screen">
      <RGBBackground />
      <div className="relative min-h-screen">
        {/* Status bar */}
        <div className="sticky top-0 z-50 flex justify-between items-center px-4 py-2 bg-background/80 backdrop-blur-sm">
          <span className="font-medium">{time}</span>
          <div className="flex items-center gap-2">
            <Signal 
              className={cn("w-4 h-4", 
                signalStrength === 0 && "opacity-30",
                signalStrength === 1 && "opacity-60"
              )} 
            />
            <Wifi 
              className={cn("w-4 h-4", 
                wifiStrength === 0 && "opacity-30",
                wifiStrength === 1 && "opacity-60"
              )} 
            />
            <Battery 
              className={cn("w-4 h-4", 
                batteryLevel === 0 && "text-red-500",
                batteryLevel === 1 && "text-yellow-500",
                batteryLevel === 2 && "text-green-500"
              )} 
            />
          </div>
        </div>

        {/* App grid */}
        <div className={cn(
          "grid grid-cols-4 gap-4 pt-12",
          openApp && "hidden" // Hide grid when app is open
        )}>
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                className="flex flex-col items-center gap-1 group"
                onClick={() => handleAppClick(app.id)}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-95 transition-transform">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                  {app.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile app window */}
        {openApp && (
          <div
            className={cn(
              "fixed inset-0 bg-background",
              isAnimating ? "translate-y-full" : "translate-y-0",
              "transition-transform duration-300 ease-in-out"
            )}
          >
            <div className="h-full overflow-auto">
              {/* App header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b">
                <button
                  onClick={handleClose}
                  className="text-sm font-medium text-primary"
                >
                  ← Back
                </button>
                <h1 className="text-lg font-semibold">
                  {apps.find(app => app.id === openApp)?.label}
                </h1>
                <div className="w-12" /> {/* Spacer for centering */}
              </div>
              
              {/* App content */}
              <div className="p-4">
                {openApp && apps.find(app => app.id === openApp)?.component && (
                  <div className={cn(
                    "transition-opacity duration-300",
                    isAnimating ? "opacity-0" : "opacity-100"
                  )}>
                    {React.createElement(apps.find(app => app.id === openApp)!.component)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dock */}
        <div className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-3xl border border-white/30 dark:border-white/10 shadow-lg flex items-center justify-around px-4",
          openApp && "hidden" // Hide dock when app is open
        )}>
          {apps.slice(0, 4).map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                onClick={() => handleAppClick(app.id)}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-gray-800/90 flex items-center justify-center shadow-sm">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Home indicator */}
        <div className={cn(
          "fixed bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 dark:bg-white/20 rounded-full",
          openApp && "hidden" // Hide indicator when app is open
        )} />
      </div>
    </div>
  );
};