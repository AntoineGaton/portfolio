/**
 * Home Page
 * @component
 * TODO: Add mobile layout
 * TODO: Add more apps
 * TODO: Add ability to change colors, themes and wallpapers
 * TODO: Add LinkedIn and GitHub API integrations
 * TODO: Add Calendar Integration
 * TODO: Add Battery Status
 * TODO: Add System Tray Icons
 */
"use client";

import { Desktop } from "@/components/Desktop";
import { Background } from "@/components/Background";
import { LoadingScreen } from "@/components/LoadingScreen";
// import { MobileLayout } from "@/components/MobileLayout";
import { Taskbar } from "@/components/Taskbar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [openWindows, setOpenWindows] = useState<Array<{ id: string; isMinimized: boolean }>>([]);

  const handleWindowRestore = (id: string) => {
    setOpenWindows(windows =>
      windows.map(window =>
        window.id === id ? { ...window, isMinimized: false } : window
      )
    );
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <LoadingScreen />
      <Background />
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-2 right-2 z-50"
        onClick={handleFullScreen}
      >
        <Maximize className="h-4 w-4" />
      </Button>
      <div className="flex-1 relative">
        <Desktop />
      </div>
      <Taskbar 
        openWindows={openWindows}
        onWindowRestore={handleWindowRestore}
      />
    </main>
  );
}