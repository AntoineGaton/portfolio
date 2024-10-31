"use client";

import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, Apps } from "lucide-react";
import { GamesContent } from "./window-contents/GamesContent";
import { AppsContent } from "./window-contents/AppsContent";

interface WindowState {
  id: string;
  isMinimized: boolean;
}

export function Desktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string>("");

  const icons = [
    { id: "about", icon: User2, label: "About Me" },
    { id: "projects", icon: Code2, label: "Projects" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "resume", icon: FileText, label: "Resume" },
    { id: "contact", icon: Mail, label: "Contact" },
    { id: "games", icon: Gamepad2, label: "Games" },
    { id: "apps", icon: Apps, label: "Apps" }
  ];

  const handleIconClick = (id: string) => {
    if (!openWindows.find(w => w.id === id)) {
      setOpenWindows([...openWindows, { id, isMinimized: false }]);
    } else {
      setOpenWindows(openWindows.map(w => 
        w.id === id ? { ...w, isMinimized: false } : w
      ));
    }
    setActiveWindow(id);
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
    if (activeWindow === id) {
      const remainingWindows = openWindows.filter(w => w.id !== id);
      setActiveWindow(remainingWindows[remainingWindows.length - 1]?.id || "");
    }
  };

  const handleMinimizeWindow = (id: string) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    if (activeWindow === id) {
      const visibleWindows = openWindows.filter(w => !w.isMinimized && w.id !== id);
      setActiveWindow(visibleWindows[visibleWindows.length - 1]?.id || "");
    }
  };

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

  return (
    <div className="h-[calc(100vh-48px)] w-full p-4">
      <div className="grid grid-cols-1 gap-4">
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => handleIconClick(icon.id)}
          />
        ))}
      </div>

      {openWindows.map((window) => {
        const icon = icons.find(i => i.id === window.id);
        return (
          <Window
            key={window.id}
            title={icon?.label || ""}
            isActive={activeWindow === window.id}
            isMinimized={window.isMinimized}
            onClose={() => handleCloseWindow(window.id)}
            onClick={() => setActiveWindow(window.id)}
            onMinimize={() => handleMinimizeWindow(window.id)}
          >
            {getWindowContent(window.id)}
          </Window>
        );
      })}
    </div>
  );
}