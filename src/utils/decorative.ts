// Hero decorative floating elements

/**
 * Generate the specific floating elements used in the Hero component
 */
export const generateFloatingElements = (): string[] => {
  return [
    // Top-right red square
    "absolute pointer-events-none -top-4 -right-4 w-8 h-8 rounded-lg bg-red-500 animate-bounce opacity-80 delay-1000 rotate-12",
    // Bottom-left blue diamond
    "absolute pointer-events-none -bottom-4 -left-4 w-6 h-6 rounded-lg bg-blue-500 animate-bounce opacity-60 delay-500 rotate-45",
    // Center-left green circle
    "absolute pointer-events-none top-1/2 -left-8 w-4 h-4 rounded-full bg-green-500 animate-pulse opacity-40 delay-300",
  ];
};
