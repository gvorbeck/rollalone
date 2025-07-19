// Animation utilities for components

import { cn } from "@/utils/cn";

/**
 * Panel animation states for floating overlays
 */
export const createPanelStates = (isOpen: boolean) => ({
  visible: cn(
    isOpen ? "opacity-100" : "opacity-0",
    isOpen ? "scale-100" : "scale-95",
    isOpen ? "translate-y-0 translate-x-0" : "translate-y-2",
    isOpen ? "" : "pointer-events-none",
    "transform"
  ),
  base: "transform transition-all duration-300 ease-out",
});

/**
 * FAB (Floating Action Button) animation states
 */
export const createFABStates = (isOpen: boolean) => ({
  rotation: isOpen ? "rotate-45" : "rotate-0",
  scale: "",
  base: cn(
    "transform transition-all duration-300 ease-out",
    "hover:scale-105 active:scale-95"
  ),
});

/**
 * Common hover effects
 */
export const HOVER_EFFECTS = {
  lift: "hover:shadow-lg hover:-translate-y-1",
  glow: "hover:shadow-xl hover:shadow-red-500/25",
  scale: "hover:scale-105",
  brightness: "hover:brightness-110",
  opacity: "hover:opacity-80",
} as const;

/**
 * Focus effects for accessibility
 */
export const FOCUS_EFFECTS = {
  ring: "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900",
  outline: "focus:outline-2 focus:outline-red-500 focus:outline-offset-2",
  glow: "focus:shadow-lg focus:shadow-red-500/50",
} as const;

/**
 * Card highlight animation (used for scroll-to-card)
 */
export const CARD_HIGHLIGHT_ANIMATION = "card-highlight";

/**
 * Trigger DOM-based animations with proper cleanup
 */
export const triggerAnimation = (
  element: HTMLElement,
  animationClass: string,
  duration: number = 1500
): Promise<void> => {
  return new Promise((resolve) => {
    // Remove any existing animation
    element.classList.remove(animationClass);

    // Force reflow
    void element.offsetHeight;

    // Add animation
    element.classList.add(animationClass);

    // Remove after duration
    const timeout = setTimeout(() => {
      element.classList.remove(animationClass);
      resolve();
    }, duration);

    // Cleanup if element is removed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node === element || (node as Element).contains?.(element)) {
            clearTimeout(timeout);
            observer.disconnect();
            resolve();
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
};
