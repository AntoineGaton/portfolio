"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Terminal, SkipForward, Code, Laptop } from "lucide-react";
import { Button } from "./ui/button";

interface LoadingScreenProps {
  onComplete: () => void;
}

// Add new loading screen designs
const TerminalDesign = ({ text }: { text: string }) => (
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
);

const CodeDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] rounded-lg bg-zinc-900 p-6 font-mono shadow-xl">
    <div className="flex items-center gap-4 mb-4">
      <Code className="h-8 w-8 text-blue-400" />
      <div className="h-2 w-24 bg-blue-400/30 rounded-full animate-pulse"></div>
    </div>
    <p className="text-blue-400 typing-effect">
      {text}
      <span className="animate-pulse">|</span>
    </p>
  </div>
);

const MatrixDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] font-mono">
    <div className="grid grid-cols-12 gap-1 mb-4">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="h-2 bg-emerald-500/30 rounded-full animate-pulse"
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
    <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-emerald-500/20">
      <p className="text-emerald-400 text-lg">
        {text}
        <span className="animate-pulse">⌷</span>
      </p>
    </div>
  </div>
);

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // Add design selector
  const [designIndex] = useState(() => Math.floor(Math.random() * 3));

  const roles = useMemo(() => [
    "a son.",
    "a brother.",
    "a husband.",
    "an entrepreneur.",
    "a software engineer!"
  ], []);

  const handleSkip = () => {
    setIsComplete(true);
    onComplete();
  };

  useEffect(() => {
    const baseText = "Antoine Gaton is ";
    let timeout: NodeJS.Timeout;

    const typeText = () => {
      if (isDeleting) {
        if (text.length > baseText.length) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => prev + 1);
        }
        timeout = setTimeout(typeText, 20);
      } else {
        const currentRole = roles[currentIndex];
        const targetText = baseText + currentRole;
        
        if (text.length < targetText.length) {
          setText(targetText.slice(0, text.length + 1));
          timeout = setTimeout(typeText, 40);
        } else {
          if (currentIndex === roles.length - 1) {
            timeout = setTimeout(() => {
              setIsComplete(true);
            }, 3000);
            return;
          }
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

  const designs = [
    {
      component: <TerminalDesign text={text} />,
      icon: <Terminal className="h-20 w-20 text-green-500" />,
      bgColor: "bg-black",
      textColor: "text-green-500"
    },
    {
      component: <CodeDesign text={text} />,
      icon: <Laptop className="h-20 w-20 text-blue-400" />,
      bgColor: "bg-zinc-950",
      textColor: "text-blue-400"
    },
    {
      component: <MatrixDesign text={text} />,
      icon: <Code className="h-20 w-20 text-emerald-400" />,
      bgColor: "bg-black",
      textColor: "text-emerald-400"
    }
  ];

  const selectedDesign = designs[designIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] flex items-center justify-center ${selectedDesign.bgColor} cursor-pointer`}
      onClick={handleSkip}
    >
      <div className="w-[600px] space-y-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          {selectedDesign.icon}
        </motion.div>

        <div className="space-y-6">
          {selectedDesign.component}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`${selectedDesign.textColor}/70 text-sm`}
        >
          Click anywhere to skip
        </motion.p>
      </div>
    </motion.div>
  );
}