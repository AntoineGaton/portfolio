'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export function PortfolioContent() {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState('I am');
  const targetText = 'About Me';

  useEffect(() => {
    if (isHovered) {
      let currentIndex = 0;
      setDisplayText('');
      
      const typingInterval = setInterval(() => {
        if (currentIndex < targetText.length) {
          setDisplayText(prev => prev + targetText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100); // Adjust typing speed here

      return () => clearInterval(typingInterval);
    } else {
      setDisplayText('I am');
    }
  }, [isHovered]);

  return (
    <div className="h-full w-full bg-black overflow-hidden">
      <div className="flex h-full">
        {/* Left side - Text */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20">
          <div className="space-y-2">
            <h1 
              className="text-4xl md:text-6xl lg:text-8xl font-bold relative"
            >
              <span
                className="cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  color: isHovered ? 'transparent' : 'white',
                  WebkitBackgroundClip: isHovered ? 'text' : 'unset',
                  backgroundClip: isHovered ? 'text' : 'unset',
                  backgroundImage: isHovered ? 'linear-gradient(90deg, #ff0000, #00ff00, #0000ff)' : 'none',
                  backgroundSize: '300% 100%',
                  animation: isHovered ? 'rgb-text 2s infinite linear' : 'none'
                }}
              >
                {displayText}
              </span>
              {isHovered && (
                <span className="animate-blink ml-1">|</span>
              )}
            </h1>
            <h2 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold">Antoine</h2>
            <h3 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold">Gaton</h3>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-1/2 relative h-full">
          <Image
            src="/images/Antoine.jpg"
            alt="Antoine Gaton"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
            priority
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes rgb-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
} 