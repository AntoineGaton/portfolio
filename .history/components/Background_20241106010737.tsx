"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useRef } from "react";

export function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-100 to-sky-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
    />
  );
}