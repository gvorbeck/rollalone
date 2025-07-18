// Reusable layout utilities for consistent spacing and responsive design
// Eliminates duplicated layout patterns throughout the application

import { cn } from "@/utils/cn";

/**
 * Common card/panel styling patterns
 */
export const CARD_STYLES = {
  // Base card styles
  base: "bg-gray-800 border border-gray-700 rounded-lg shadow-lg",
  content: "bg-gray-700 rounded p-3",
  item: "bg-gray-700 rounded text-sm p-2",

  // Card variations
  floating: "bg-gray-800 rounded-lg shadow-2xl border border-gray-700",
  inline: "bg-gray-700 rounded",

  // Interactive cards
  hoverable:
    "hover:shadow-xl hover:border-gray-600 transition-all duration-300",
  clickable: "cursor-pointer hover:bg-gray-750 active:bg-gray-800",
} as const;

/**
 * Text styling patterns for status/metadata
 */
export const TEXT_STYLES = {
  // Status text patterns
  muted: "text-gray-400 text-sm",
  caption: "text-gray-400 text-xs",
  label: "text-gray-400 text-xs font-medium uppercase tracking-wide",

  // Content text patterns
  body: "text-gray-300",
  title: "text-white font-semibold",
  subtitle: "text-gray-300 text-lg",

  // Interactive text
  link: "text-red-400 hover:text-red-300 cursor-pointer",
  button: "text-white hover:text-gray-200",
} as const;

/**
 * Spacing utilities for consistent gaps and padding
 */
export const SPACING = {
  // Standard spacing patterns
  xs: "gap-1 p-1",
  sm: "gap-2 p-2",
  md: "gap-4 p-4",
  lg: "gap-6 p-6",
  xl: "gap-8 p-8",

  // Component-specific spacing
  panel: "p-4",
  card: "p-3",
  item: "p-2",

  // Layout gaps
  tight: "gap-1",
  normal: "gap-4",
  loose: "gap-6",
  wide: "gap-8",
} as const;

/**
 * Responsive grid layouts
 */
export const GRID_LAYOUTS = {
  // Masonry-style responsive grid
  masonry:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start",

  // Standard responsive grids
  responsive2: "grid grid-cols-1 md:grid-cols-2 gap-4",
  responsive3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  responsive4:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",

  // Auto-fit grids
  autoFit:
    "grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 items-start",
  autoFitSmall: "grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4",

  // Flex layouts
  flexWrap: "flex flex-wrap gap-4",
  flexStack: "flex flex-col gap-4",
  flexRow: "flex flex-row gap-4",
} as const;

/**
 * Container utilities for consistent max-widths and centering
 */
export const CONTAINERS = {
  // Page containers
  page: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "max-w-4xl mx-auto px-4",

  // Content containers
  narrow: "max-w-2xl mx-auto",
  wide: "max-w-6xl mx-auto",
  full: "w-full",

  // Panel containers
  panel: "max-w-96 max-w-[calc(100vw-2rem)]",
  modal: "max-w-lg mx-auto",
} as const;

/**
 * Scroll area styling for consistent scrollbars
 */
export const SCROLL_AREA = "overflow-y-auto custom-scrollbar";

/**
 * Empty state styling
 */
export const EMPTY_STATE = cn(TEXT_STYLES.muted, "text-center py-4");

/**
 * Responsive breakpoint utilities
 */
export const BREAKPOINTS = {
  // Standard Tailwind breakpoints
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Responsive column patterns that match the masonry breakpoints
 */
export const RESPONSIVE_COLUMNS = {
  // Matches the masonry grid pattern: 1 -> 2 -> 3 -> 4 columns
  masonry: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",

  // Other common patterns
  auto2: "grid-cols-1 md:grid-cols-2",
  auto3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  auto4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",

  // Auto-fit patterns
  autoFit350: "grid-cols-[repeat(auto-fit,minmax(350px,1fr))]",
  autoFit250: "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
  autoFit200: "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
} as const;

/**
 * Responsive gap patterns
 */
export const RESPONSIVE_GAPS = {
  sm: "gap-2 md:gap-4",
  md: "gap-4 md:gap-6",
  lg: "gap-6 md:gap-8",
  adaptive: "gap-4 md:gap-6 xl:gap-8",
} as const;

/**
 * Builder for creating consistent layout classes
 */
export class LayoutBuilder {
  private classes: string[] = [];

  static create() {
    return new LayoutBuilder();
  }

  card(variant: keyof typeof CARD_STYLES = "base") {
    this.classes.push(CARD_STYLES[variant]);
    return this;
  }

  text(variant: keyof typeof TEXT_STYLES) {
    this.classes.push(TEXT_STYLES[variant]);
    return this;
  }

  spacing(variant: keyof typeof SPACING) {
    this.classes.push(SPACING[variant]);
    return this;
  }

  grid(variant: keyof typeof GRID_LAYOUTS) {
    this.classes.push(GRID_LAYOUTS[variant]);
    return this;
  }

  container(variant: keyof typeof CONTAINERS) {
    this.classes.push(CONTAINERS[variant]);
    return this;
  }

  scrollable() {
    this.classes.push(SCROLL_AREA);
    return this;
  }

  emptyState() {
    this.classes.push(EMPTY_STATE);
    return this;
  }

  custom(className: string) {
    this.classes.push(className);
    return this;
  }

  build(): string {
    return cn(...this.classes);
  }
}

/**
 * Quick utility functions for common patterns
 */
export const createCardClasses = (
  variant: keyof typeof CARD_STYLES = "base",
  interactive = false
) => {
  return cn(CARD_STYLES[variant], interactive && CARD_STYLES.hoverable);
};

export const createTextClasses = (variant: keyof typeof TEXT_STYLES) => {
  return TEXT_STYLES[variant];
};

export const createGridClasses = (columns: 1 | 2 | 3 | 4) => {
  switch (columns) {
    case 1:
      return "grid grid-cols-1 gap-4";
    case 2:
      return GRID_LAYOUTS.responsive2;
    case 3:
      return GRID_LAYOUTS.responsive3;
    case 4:
      return GRID_LAYOUTS.responsive4;
  }
};

/**
 * Screen reader utilities
 */
export const SR_ONLY = "sr-only";
export const VISUALLY_HIDDEN =
  "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0";
