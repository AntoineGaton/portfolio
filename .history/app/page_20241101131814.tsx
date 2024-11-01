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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <main className="min-h-screen">
      const [isLoading, setIsLoading] = useState(true);

      <LoadingScreen />
      <Background />
      <Desktop />
      <Taskbar 
        openWindows={openWindows}
        onWindowRestore={handleWindowRestore}
      />
    </main>
  );
}