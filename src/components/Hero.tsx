import React from "react";
import heroImage from "@/assets/hero.webp";

const Hero: React.FC = () => {
  return (
    <header
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      role="banner"
    >
      {/* Hero Image Container */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[70vh] items-center gap-8 px-4 py-16 lg:py-24">
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
                src={heroImage}
                alt="Solo TTRPG adventurer"
                className="relative z-10 w-full h-auto max-w-lg drop-shadow-2xl rounded-lg"
              />

              {/* Subtle frame effect */}
              <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 z-20 pointer-events-none"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-lg rotate-12 opacity-80 animate-bounce delay-1000"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded rotate-45 opacity-60 animate-bounce delay-500"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-green-500 rounded-full opacity-40 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900"></div>
    </header>
  );
};

export default Hero;
