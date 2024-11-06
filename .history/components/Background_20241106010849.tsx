"use client";

import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

export function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!isMobile && containerRef.current) {
      const updateBackgroundColor = () => {
        if (!containerRef.current) return;
        const time = Date.now() * 0.001;
        const r = Math.floor((Math.sin(time * 0.5) * 0.5 + 0.5) * 20);
        const g = Math.floor((Math.sin(time * 0.5 + 2) * 0.5 + 0.5) * 20);
        const b = Math.floor((Math.sin(time * 0.5 + 4) * 0.5 + 0.5) * 20);
        containerRef.current.style.background = `linear-gradient(45deg, 
          rgb(${r},${g},${b}), 
          rgb(${b},${r},${g}))`;
      };

      const animationFrame = setInterval(updateBackgroundColor, 16);
      return () => clearInterval(animationFrame);
    }
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-100 to-sky-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
    />
  );
}