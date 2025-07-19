// Simple layout utilities for components that need them

/**
 * Card/panel styling patterns used by components
 */
export const CARD_STYLES = {
  content: "bg-gray-700 rounded p-3",
  item: "bg-gray-700 rounded text-sm p-2",
} as const;

/**
 * Text styling patterns for component metadata
 */
export const TEXT_STYLES = {
  muted: "text-gray-400 text-sm",
  caption: "text-gray-400 text-xs",
} as const;

/**
 * Empty state styling
 */
export const EMPTY_STATE = "text-gray-400 text-sm text-center py-4";
