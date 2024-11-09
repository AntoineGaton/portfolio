"use client";

import { useState, useEffect } from "react";

/**
 * Clock Component
 * Displays current time in the taskbar
 * Updates every second
 * @component
 */
export function Clock() {
   const [time, setTime] = useState<string>('');
   const [date, setDate] = useState<string>('');

   useEffect(() => {
      const updateDateTime = () => {
         const now = new Date();
         
         // Format time as "1:54:00 AM"
         setTime(now.toLocaleTimeString('en-US', {
         hour: 'numeric',
         minute: '2-digit',
         second: '2-digit',
         hour12: true
         }));
         
         // Format date as "10/31/2024"
         setDate(now.toLocaleDateString('en-US', {
         month: 'numeric',
         day: 'numeric',
         year: 'numeric'
         }));
      };

      updateDateTime();
      const interval = setInterval(updateDateTime, 1000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="flex flex-col items-end justify-center">
         <span className="text-sm">{time}</span>
         <span className="text-xs">{date}</span>
      </div>
  );
}