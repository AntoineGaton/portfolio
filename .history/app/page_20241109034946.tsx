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
import { useState, useEffect } from "react";
import { Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Terminal } from '@/components/Terminal';

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(true);
  const [openWindows, setOpenWindows] = useState<Array<{ id: string; isMinimized: boolean }>>([]);

  const handleWindowRestore = (id: string) => {
    setOpenWindows(windows =>
      windows.map(window =>
        window.id === id ? { ...window, isMinimized: false } : window
      )
    );
  };

  const handleWindowOpen = (id: string) => {
    setOpenWindows(windows => [...windows, { id, isMinimized: false }]);
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // F11 key or Cmd/Ctrl + Enter
      if (e.key === 'F11' || ((e.metaKey || e.ctrlKey) && e.key === 'Enter')) {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.log(`Error attempting to enable full-screen mode: ${err.message}`);
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      <Background />
      <div className="flex-1 relative">
        <Desktop />
      </div>
      <Taskbar 
        openWindows={openWindows}
        onWindowRestore={handleWindowRestore}
        onWindowOpen={handleWindowOpen}
      />
    </main>
  );
}