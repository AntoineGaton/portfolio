"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "./ui/button";

export function Clock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-sm font-medium"
    >
      {format(time, "h:mm a")}
    </Button>
  );
}