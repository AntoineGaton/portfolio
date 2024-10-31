'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function IntroScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black flex flex-col items-start justify-center p-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1 
        className="text-white text-7xl font-bold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Hello
      </motion.h1>
      <motion.h2 
        className="text-white text-7xl font-bold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        I am
      </motion.h2>
      <motion.h3 
        className="text-[#4ade80] text-7xl font-bold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Vova
      </motion.h3>
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="cursor-pointer">Tap anywhere</span>
      </motion.div>
    </motion.div>
  );
} 