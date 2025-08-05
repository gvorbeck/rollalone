import React from "react";
import heroImage400 from "@/assets/hero-400w.webp";
import heroImage600 from "@/assets/hero-600w.webp";
import heroImage800 from "@/assets/hero-800w.webp";
import heroImage1200 from "@/assets/hero-1200w.webp";
import { generateFloatingElements } from "@/utils/decorative";

const Hero: React.FC = () => {
  return (
    <header
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      role="banner"
    >
      {/* Hero Image Container */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[70vh] items-center gap-8 px-4 pt-16">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
                Roll
                <span className="text-red-500"> Alone</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Your complete toolkit for solo tabletop RPG adventures
              </p>
              <p className="sr-only">
                Roll Alone is a comprehensive digital toolkit for solo tabletop
                role-playing games, featuring advanced dice rolling, oracle
                systems, generators, and decision-making tools that work with
                any TTRPG system without requiring a Game Master.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>One page engine - everything you need</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Works with any TTRPG system</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>No GM required</span>
              </div>
            </div>

            {/* Domain branding */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300 font-mono text-sm">
                  rollal.one
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative inline-block">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-lg transform scale-105"></div>

              {/* Main hero image */}
              <img
                src={heroImage800}
                srcSet={`
                  ${heroImage400} 400w,
                  ${heroImage600} 600w,
                  ${heroImage800} 800w,
                  ${heroImage1200} 1200w
                `}
                sizes="(max-width: 640px) 400px, (max-width: 768px) 600px, (max-width: 1024px) 800px, 1200px"
                alt="Solo tabletop RPG adventurer with dice, cards, and mystical elements - Roll Alone toolkit for solo TTRPG gaming"
                className="relative z-10 w-full h-auto max-w-lg drop-shadow-2xl rounded-lg"
                loading="eager"
                decoding="async"
                width="512"
                height="341"
              />

              {/* Subtle frame effect */}
              <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 z-20 pointer-events-none"></div>
            </div>

            {/* Floating elements */}
            {generateFloatingElements().map((className, index) => (
              <div key={index} className={className} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t to-transparent from-gray-900"></div>
    </header>
  );
};

export default Hero;
