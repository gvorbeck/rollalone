// Reusable scrollbar utilities to consolidate custom scrollbar patterns
// Eliminates duplicated scrollbar CSS throughout the application

import { cn } from "@/utils/cn";

/**
 * Custom scrollbar class for consistent styling
 * This replaces the inline CSS patterns used throughout the app
 */
export const CUSTOM_SCROLLBAR = "custom-scrollbar";

/**
 * Different scrollbar themes
 */
export const SCROLLBAR_THEMES = {
  default: "custom-scrollbar",
  thin: "custom-scrollbar-thin",
  dark: "custom-scrollbar-dark",
  light: "custom-scrollbar-light",
} as const;

/**
 * Scrollbar size variants
 */
export const SCROLLBAR_SIZES = {
  xs: "scrollbar-xs", // 4px
  sm: "scrollbar-sm", // 6px
  md: "scrollbar-md", // 8px (default)
  lg: "scrollbar-lg", // 12px
} as const;

/**
 * Create a scrollable container with custom scrollbar
 */
export const createScrollableContainer = (
  theme: keyof typeof SCROLLBAR_THEMES = "default",
  size: keyof typeof SCROLLBAR_SIZES = "md"
) => {
  return cn("overflow-y-auto", SCROLLBAR_THEMES[theme], SCROLLBAR_SIZES[size]);
};

/**
 * Utility for common scroll container patterns
 */
export const SCROLL_CONTAINERS = {
  // Standard scrollable areas
  panel: createScrollableContainer("default", "md"),
  list: createScrollableContainer("default", "sm"),
  content: createScrollableContainer("default", "md"),

  // Specific height patterns
  short: "max-h-48 overflow-y-auto custom-scrollbar",
  medium: "max-h-64 overflow-y-auto custom-scrollbar",
  tall: "max-h-96 overflow-y-auto custom-scrollbar",
  viewport: "max-h-[90vh] overflow-y-auto custom-scrollbar",
} as const;
