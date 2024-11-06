"use client";
import { useState } from "react";
import { User2, Code2, Briefcase, FileText, Mail, Gamepad2, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Dynamically import content components
const AboutContent = dynamic(() => import("./window-contents/AboutContent").then(mod => ({ default: mod.default })));
const ProjectsContent = dynamic(() => import("./window-contents/ProjectsContent").then(mod => ({ default: mod.default })));
const ExperienceContent = dynamic(() => import("./window-contents/ExperienceContent").then(mod => ({ default: mod.default })));
const ResumeContent = dynamic(() => import("./window-contents/ResumeContent").then(mod => ({ default: mod.default })));
const ContactContent = dynamic(() => import("./window-contents/ContactContent").then(mod => ({ default: mod.default })));
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

  const apps: AppIcon[] = [
    { id: "about", icon: User2, label: "About Me", component: AboutContent },
    { id: "projects", icon: Code2, label: "Projects", component: ProjectsContent },
    { id: "experience", icon: Briefcase, label: "Experience", component: ExperienceContent },
    { id: "resume", icon: FileText, label: "Resume", component: ResumeContent },
    { id: "contact", icon: Mail, label: "Contact", component: ContactContent },
    { id: "games", icon: Gamepad2, label: "Games", component: GamesContent },
    { id: "apps", icon: Apps, label: "Apps", component: AppsContent }
  ];

  const handleAppClick = (id: string) => {
    setIsAnimating(true);
    setOpenApp(id);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setOpenApp(null);
  };

  const CurrentComponent = openApp ? apps.find(app => app.id === openApp)?.component : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 dark:from-gray-900 dark:to-gray-800 p-6">
      {!openApp ? (
        <div className="grid grid-cols-4 gap-4 pt-12">
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
      ) : (
        <div
          className={cn(
            "fixed inset-0 bg-background transition-transform duration-300",
            isAnimating ? "translate-y-0" : "translate-y-full"
          )}
          onTransitionEnd={() => setIsAnimating(false)}
        >
          <div className="h-full overflow-auto">
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
            <div className="p-4">
              {CurrentComponent && <CurrentComponent />}
            </div>
          </div>
        </div>
      )}

      {/* iOS-style home indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
    </div>
  );
}