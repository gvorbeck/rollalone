import React from "react";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Welcome to the Hero Component",
  subtitle = "This is a simple hero section built with Tailwind CSS.",
}) => {
  return (
    <header
      className="flex flex-col items-center justify-center px-4 py-16 text-center max-w-4xl mx-auto"
      role="banner"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
        {subtitle}
      </p>
    </header>
  );
};

export default Hero;
