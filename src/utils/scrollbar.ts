// Simple scrollbar utilities

/**
 * Utility for common scroll container patterns
 */
export const SCROLL_CONTAINERS = {
  short: "max-h-48 overflow-y-auto custom-scrollbar",
  medium: "max-h-64 overflow-y-auto custom-scrollbar",
  tall: "max-h-96 overflow-y-auto custom-scrollbar",
  viewport: "max-h-[90vh] overflow-y-auto custom-scrollbar",
} as const;
