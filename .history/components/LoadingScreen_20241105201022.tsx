"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function LoadingScreen() {
  const [isComplete, setIsComplete] = useState(false);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = useMemo(() => [
    "a son.",
    "a brother.",
    "a husband.",
    "an entrepreneur.",
    "a software engineer!"
  ], []);

  useEffect(() => {
    const baseText = "Antoine Gaton is ";
    let timeout: NodeJS.Timeout;

    const typeText = () => {
      if (isDeleting) {
        // Deleting animation
        if (text.length > baseText.length) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => prev + 1);
        }
        timeout = setTimeout(typeText, 20);
      } else {
        // Typing animation
        const currentRole = roles[currentIndex];
        const targetText = baseText + currentRole;
        
        if (text.length < targetText.length) {
          setText(targetText.slice(0, text.length + 1));
          timeout = setTimeout(typeText, 40);
        } else {
          // Check if we're at the last role
          if (currentIndex === roles.length - 1) {
            // Add 2 second delay before completing
            timeout = setTimeout(() => {
              setIsComplete(true);
            }, 2000);
            return;
          }
          // Only set deleting to true if we're not at the last role
          timeout = setTimeout(() => {
            setIsDeleting(true);
            typeText();
          }, 800);
        }
      }
    };

    if (!isComplete) {
      timeout = setTimeout(typeText, 20);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentIndex, roles, isComplete]);

  if (isComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div className="w-[600px] space-y-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Terminal className="h-20 w-20 text-green-500" />
        </motion.div>

        <div className="space-y-6">
          <div className="mx-auto max-w-[500px] rounded-lg bg-black border border-green-500 p-4 font-mono">
            <div className="flex items-center gap-2 border-b border-green-500/50 pb-2 mb-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-green-500/30"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
              </div>
              <span className="text-xs text-green-500/70">terminal</span>
            </div>
            <p className="text-left">
              <span className="text-green-500">$ </span>
              <span className="text-green-500">{text}</span>
              <span className="animate-pulse text-green-500">_</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}