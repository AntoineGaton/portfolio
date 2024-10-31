'use client';

import Image from 'next/image';

export function PortfolioContent() {
  return (
    <div className="h-full w-full bg-black overflow-hidden">
      <div className="flex h-full">
        {/* Left side - Text */}
        <div className="w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-20">
          <h1 className="text-[#4ade80] text-4xl md:text-6xl lg:text-8xl font-bold mb-2 md:mb-4">About</h1>
          <h2 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold">I am</h2>
          <h3 className="text-[#4ade80] text-4xl md:text-6xl lg:text-8xl font-bold">Antoine Gaton</h3>
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

      {/* Floating tap anywhere button */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white/60 z-50 flex items-center gap-2 animate-bounce">
        <span className="cursor-pointer text-sm md:text-base bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
          Tap anywhere
        </span>
      </div>
    </div>
  );
} 