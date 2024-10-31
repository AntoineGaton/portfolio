"use client";

import { useState, useEffect } from "react";

/**
 * Clock Component
 * Displays current time in the taskbar
 * Updates every second
 * @component
 */
export function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    /**
     * Updates the current time
     * Format: HH:MM AM/PM
     */
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
    };

    // Initial update
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm font-medium">
      {time}
    </div>
  );
}