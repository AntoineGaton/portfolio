'use client';

import Image from 'next/image';
import { useState } from 'react';

export function PortfolioContent() {
  const [hoveredItems, setHoveredItems] = useState({
    first: false,
    second: false,
    third: false
  });

  return (
    <div className="h-full w-full bg-black overflow-hidden">
      <div className="flex h-full">
        {/* Left side - Text */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20">
          <div className="space-y-2">
            <h1 
              className="text-4xl md:text-6xl lg:text-8xl font-bold cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredItems(prev => ({ ...prev, first: true }))}
              onMouseLeave={() => setHoveredItems(prev => ({ ...prev, first: false }))}
              style={{
                color: hoveredItems.first ? 'transparent' : 'white',
                WebkitBackgroundClip: hoveredItems.first ? 'text' : 'unset',
                backgroundClip: hoveredItems.first ? 'text' : 'unset',
                backgroundImage: hoveredItems.first ? 'linear-gradient(90deg, #ff0000, #00ff00, #0000ff)' : 'none',
                backgroundSize: '300% 100%',
                animation: hoveredItems.first ? 'rgb-text 2s infinite linear' : 'none'
              }}
            >
              {hoveredItems.first ? 'About Me' : 'I am'}
            </h1>
            <h2 
              className="text-4xl md:text-6xl lg:text-8xl font-bold cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredItems(prev => ({ ...prev, second: true }))}
              onMouseLeave={() => setHoveredItems(prev => ({ ...prev, second: false }))}
              style={{
                color: hoveredItems.second ? 'transparent' : 'white',
                WebkitBackgroundClip: hoveredItems.second ? 'text' : 'unset',
                backgroundClip: hoveredItems.second ? 'text' : 'unset',
                backgroundImage: hoveredItems.second ? 'linear-gradient(90deg, #ff0000, #00ff00, #0000ff)' : 'none',
                backgroundSize: '300% 100%',
                animation: hoveredItems.second ? 'rgb-text 2s infinite linear' : 'none'
              }}
            >
              {hoveredItems.second ? 'Projects/Experience' : 'Antoine'}
            </h2>
            <h3 
              className="text-4xl md:text-6xl lg:text-8xl font-bold cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredItems(prev => ({ ...prev, third: true }))}
              onMouseLeave={() => setHoveredItems(prev => ({ ...prev, third: false }))}
              style={{
                color: hoveredItems.third ? 'transparent' : 'white',
                WebkitBackgroundClip: hoveredItems.third ? 'text' : 'unset',
                backgroundClip: hoveredItems.third ? 'text' : 'unset',
                backgroundImage: hoveredItems.third ? 'linear-gradient(90deg, #ff0000, #00ff00, #0000ff)' : 'none',
                backgroundSize: '300% 100%',
                animation: hoveredItems.third ? 'rgb-text 2s infinite linear' : 'none'
              }}
            >
              {hoveredItems.third ? 'Contact' : 'Gaton'}
            </h3>
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
      `}</style>
    </div>
  );
} 