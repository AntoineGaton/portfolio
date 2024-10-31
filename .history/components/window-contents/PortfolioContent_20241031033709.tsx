'use client';

import Image from 'next/image';

export function PortfolioContent() {
  return (
    <div className="h-full w-full bg-black overflow-hidden">
      <div className="flex h-full">
        {/* Left side - Text */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20">
          <div className="space-y-2">
            <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold">I am</h1>
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
    </div>
  );
} 