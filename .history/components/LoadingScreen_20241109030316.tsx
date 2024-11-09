"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Terminal, SkipForward, Code, Laptop, Database } from "lucide-react";
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

const Windows95Design = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] rounded-sm border-2 shadow-[2px_2px_0px_0px_#000000] bg-[#c0c0c0]">
    <div className="flex items-center justify-between bg-[#000080] px-2 py-1">
      <span className="text-white text-sm font-bold">Command Prompt</span>
      <div className="flex gap-1">
        <button className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black px-2 text-sm font-bold">_</button>
        <button className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black px-2 text-sm font-bold">□</button>
        <button className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black px-2 text-sm font-bold">×</button>
      </div>
    </div>
    <div className="p-4 bg-black font-['MS_Sans_Serif']">
      <p className="text-left">
        <span className="text-gray-200">C:\WINDOWS></span>
        <span className="text-gray-200">{text}</span>
        <span className="animate-pulse text-gray-200">_</span>
      </p>
    </div>
  </div>
);

const MacTerminalDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] rounded-lg bg-[#2D2D2D] overflow-hidden shadow-xl">
    <div className="bg-[#3A3A3A] px-4 py-2 flex items-center gap-2">
      <div className="flex gap-2">
        <div className="h-3 w-3 rounded-full bg-[#FF605C] border border-[#CE4A47]"></div>
        <div className="h-3 w-3 rounded-full bg-[#FFBD44] border border-[#CD9A3A]"></div>
        <div className="h-3 w-3 rounded-full bg-[#00CA4E] border border-[#0EA642]"></div>
      </div>
      <span className="text-[#ABABAB] text-sm ml-2 flex-1 text-center font-medium">
        user@macbook ~ /terminal
      </span>
    </div>
    <div className="p-6 font-mono">
      <p className="text-left">
        <span className="text-[#78D95E]">➜</span>
        <span className="text-[#7DBEFF]"> ~/desktop</span>
        <span className="text-[#E4E4E4]"> {text}</span>
        <span className="animate-pulse text-[#E4E4E4]">▋</span>
      </p>
    </div>
  </div>
);

const MainframeDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] font-mono">
    <div className="bg-black border-2 border-green-500 p-6 rounded">
      <div className="mb-4 flex items-center justify-between border-b border-green-500/30 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-green-500 animate-pulse"></div>
          <span className="text-green-500 text-xs">IBM 3270</span>
        </div>
        <div className="text-green-500 text-xs">READY</div>
      </div>
      <div className="space-y-1">
        <div className="grid grid-cols-8 gap-1 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="text-[10px] text-green-500/50"
            >{`F${i + 1}`}</div>
          ))}
        </div>
        <p className="text-green-500 uppercase tracking-wide">
          TSO/E LOGON IN PROGRESS
        </p>
        <p className="text-green-500">
          <span className="mr-2">&gt;</span>
          {text}
          <span className="animate-pulse">█</span>
        </p>
      </div>
      <div className="mt-4 pt-2 border-t border-green-500/30 flex justify-between text-[10px] text-green-500/50">
        <span>SYSTEM ONLINE</span>
        <span>3270 TERMINAL</span>
      </div>
    </div>
  </div>
);

const LinuxTerminalDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[500px] rounded-lg overflow-hidden bg-[#300A24] shadow-xl">
    <div className="bg-[#3A2837] px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#FF605C]"></div>
          <div className="h-3 w-3 rounded-full bg-[#FFBD44]"></div>
          <div className="h-3 w-3 rounded-full bg-[#00CA4E]"></div>
        </div>
        <span className="text-gray-300 text-sm">bash</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
    </div>
    <div className="p-6 font-mono bg-[#300A24]">
      <p className="text-left mb-1">
        <span className="text-green-400">user@ubuntu</span>
        <span className="text-gray-400">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-gray-400">$</span>
        <span className="text-gray-200"> neofetch</span>
      </p>
      <div className="flex gap-4 mt-2">
        <div className="text-[#E95420] whitespace-pre font-mono text-xs leading-[1.2]">
          {`
            AAA           tt           iii                 '           PPPPPP                tt     fff        lll iii        
           AAAAA  nn nnn  tt     oooo      nn nnn    eee  '''  sss     PP   PP  oooo  rr rr  tt    ff    oooo  lll      oooo 
          AA   AA nnn  nn tttt  oo  oo iii nnn  nn ee   e ''  s        PPPPPP  oo  oo rrr  r tttt  ffff oo  oo lll iii oo  oo 
          AAAAAAA nn   nn tt    oo  oo iii nn   nn eeeee       sss     PP      oo  oo rr     tt    ff   oo  oo lll iii oo  oo 
          AA   AA nn   nn  tttt  oooo  iii nn   nn  eeeee         s    PP       oooo  rr      tttt ff    oooo  lll iii  oooo o                                             sss                                                            
          `}
        </div>
        <div className="text-gray-300 space-y-0.5">
          <p className="text-left">
            <span className="text-gray-500 mr-2">OS:</span>
            Ubuntu 22.04 LTS
          </p>
          <p className="text-left">
            <span className="text-gray-500 mr-2">Terminal:</span>
            bash 5.1.16
          </p>
          <p className="text-left text-gray-200">
            <span className="text-gray-500 mr-2">&gt;</span>
            {text}
            <span className="animate-pulse">█</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MongoDBDesign = ({ text }: { text: string }) => (
  <div className="mx-auto max-w-[600px] rounded-lg bg-[#1B1B1B] p-6 font-mono shadow-xl">
    <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
        <span className="text-emerald-500 text-sm">mongodb://localhost:27017/portfolio</span>
      </div>
    </div>
    
    <div className="space-y-2 text-sm">
      <p className="text-gray-400">
        <span className="text-emerald-400">></span> use portfolio
      </p>
      <p className="text-gray-400">
        <span className="text-emerald-400">portfolio></span> db.antoine.findOne()
      </p>
      
      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
        {`{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Antoine Gaton",
  "title": "Full Stack Developer",
  "location": "France",
  "skills": [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "MongoDB",
    "AWS"
  ],
  "roles": [
    "Software Engineer",
    "Entrepreneur",
    "Husband",
    "Brother",
    "Son"
  ],
  "experience": {
    "years": 5,
    "companies": [
      "Self-employed",
      "Previous ventures"
    ]
  },
  "education": {
    "degree": "Computer Science",
    "certifications": [
      "AWS Certified",
      "MongoDB Professional"
    ]
  },
  "currentStatus": "${text}",
  "lastUpdated": ISODate("${new Date().toISOString()}")
}`}
      </div>
      
      <p className="text-emerald-400 flex items-center gap-2">
        <span className="animate-pulse">●</span>
        <span>Connection is alive</span>
      </p>
    </div>
  </div>
);

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // Use useEffect to set the random design index after initial render
  const [designIndex, setDesignIndex] = useState(0);

  useEffect(() => {
    setDesignIndex(Math.floor(Math.random() * 6));
  }, []);

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

  // Add a loading state to prevent initial render mismatch
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Short timeout to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  if (isComplete) return null;
  if (isLoading) return null; // Return null during initial load

  const designs = [
    {
      component: <Windows95Design text={text} />,
      icon: <Terminal className="h-20 w-20 text-[#000080]" />,
      bgColor: "bg-[#008080]",
      textColor: "text-white"
    },
    {
      component: <MacTerminalDesign text={text} />,
      icon: <Terminal className="h-20 w-20 text-[#78D95E]" />,
      bgColor: "bg-[#2D2D2D]",
      textColor: "text-[#E4E4E4]"
    },
    {
      component: <MatrixDesign text={text} />,
      icon: <Code className="h-20 w-20 text-emerald-400" />,
      bgColor: "bg-black",
      textColor: "text-emerald-400"
    },
    {
      component: <MainframeDesign text={text} />,
      icon: <Terminal className="h-20 w-20 text-green-500" />,
      bgColor: "bg-black",
      textColor: "text-green-500"
    },
    {
      component: <LinuxTerminalDesign text={text} />,
      icon: <Terminal className="h-20 w-20 text-[#E95420]" />,
      bgColor: "bg-[#300A24]",
      textColor: "text-gray-200"
    },
    {
      component: <MongoDBDesign text={text} />,
      icon: <Database className="h-20 w-20 text-emerald-400" />,
      bgColor: "bg-[#1B1B1B]",
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