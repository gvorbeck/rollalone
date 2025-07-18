// Reusable decorative elements for visual enhancement
// Eliminates duplicated floating element patterns

import { cn } from "@/utils/cn";

/**
 * Base floating element styles
 */
export const FLOATING_ELEMENT_BASE = [
  "absolute",
  "pointer-events-none",
] as const;

/**
 * Floating element positions
 */
export const FLOATING_POSITIONS = {
  topRight: "-top-4 -right-4",
  topLeft: "-top-4 -left-4",
  bottomRight: "-bottom-4 -right-4",
  bottomLeft: "-bottom-4 -left-4",
  centerLeft: "top-1/2 -left-8",
  centerRight: "top-1/2 -right-8",
  topCenter: "-top-4 left-1/2 -translate-x-1/2",
  bottomCenter: "-bottom-4 left-1/2 -translate-x-1/2",
} as const;

/**
 * Floating element sizes
 */
export const FLOATING_SIZES = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
} as const;

/**
 * Floating element shapes
 */
export const FLOATING_SHAPES = {
  square: "rounded",
  circle: "rounded-full",
  rounded: "rounded-lg",
  diamond: "rotate-45",
} as const;

/**
 * Floating element colors
 */
export const FLOATING_COLORS = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  indigo: "bg-indigo-500",
  gray: "bg-gray-500",
} as const;

/**
 * Floating element animations
 */
export const FLOATING_ANIMATIONS = {
  bounce: "animate-bounce",
  pulse: "animate-pulse",
  spin: "animate-spin",
  ping: "animate-ping",
  none: "",
} as const;

/**
 * Opacity levels for floating elements
 */
export const FLOATING_OPACITY = {
  light: "opacity-20",
  subtle: "opacity-40",
  medium: "opacity-60",
  strong: "opacity-80",
  full: "opacity-100",
} as const;

/**
 * Animation delays
 */
export const ANIMATION_DELAYS = {
  none: "",
  short: "delay-300",
  medium: "delay-500",
  long: "delay-1000",
  longer: "delay-1500",
} as const;

/**
 * Create a floating decorative element
 */
export interface FloatingElementConfig {
  position: keyof typeof FLOATING_POSITIONS;
  size: keyof typeof FLOATING_SIZES;
  shape: keyof typeof FLOATING_SHAPES;
  color: keyof typeof FLOATING_COLORS;
  animation?: keyof typeof FLOATING_ANIMATIONS;
  opacity?: keyof typeof FLOATING_OPACITY;
  delay?: keyof typeof ANIMATION_DELAYS;
  extraClasses?: string;
}

export const createFloatingElement = (
  config: FloatingElementConfig
): string => {
  return cn(
    FLOATING_ELEMENT_BASE,
    FLOATING_POSITIONS[config.position],
    FLOATING_SIZES[config.size],
    FLOATING_SHAPES[config.shape],
    FLOATING_COLORS[config.color],
    config.animation && FLOATING_ANIMATIONS[config.animation],
    config.opacity && FLOATING_OPACITY[config.opacity],
    config.delay && ANIMATION_DELAYS[config.delay],
    config.extraClasses
  );
};

/**
 * Pre-defined floating element sets for common patterns
 */
export const FLOATING_ELEMENT_SETS = {
  heroDecorative: [
    {
      position: "topRight" as const,
      size: "lg" as const,
      shape: "rounded" as const,
      color: "red" as const,
      animation: "bounce" as const,
      opacity: "strong" as const,
      delay: "long" as const,
      extraClasses: "rotate-12",
    },
    {
      position: "bottomLeft" as const,
      size: "md" as const,
      shape: "diamond" as const,
      color: "blue" as const,
      animation: "bounce" as const,
      opacity: "medium" as const,
      delay: "medium" as const,
    },
    {
      position: "centerLeft" as const,
      size: "sm" as const,
      shape: "circle" as const,
      color: "green" as const,
      animation: "pulse" as const,
      opacity: "subtle" as const,
      delay: "short" as const,
    },
  ],

  cardDecorative: [
    {
      position: "topRight" as const,
      size: "sm" as const,
      shape: "circle" as const,
      color: "purple" as const,
      animation: "pulse" as const,
      opacity: "subtle" as const,
      delay: "short" as const,
    },
    {
      position: "bottomLeft" as const,
      size: "xs" as const,
      shape: "square" as const,
      color: "pink" as const,
      animation: "ping" as const,
      opacity: "light" as const,
      delay: "medium" as const,
    },
  ],
} as const;

/**
 * Generate floating elements from a predefined set
 */
export const generateFloatingElements = (
  setName: keyof typeof FLOATING_ELEMENT_SETS
): string[] => {
  return FLOATING_ELEMENT_SETS[setName].map((config) =>
    createFloatingElement(config)
  );
};

/**
 * React component helper for floating elements
 * Usage example:
 * ```tsx
 * import { FloatingElement } from "@/utils/decorative";
 *
 * <FloatingElement
 *   position="topRight"
 *   size="lg"
 *   shape="rounded"
 *   color="red"
 *   animation="bounce"
 *   opacity="strong"
 *   delay="long"
 * />
 * ```
 */
export interface FloatingElementProps extends FloatingElementConfig {
  key?: string | number;
}
