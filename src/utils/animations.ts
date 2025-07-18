// Reusable animation utilities for consistent transitions and effects
// Eliminates duplicated animation classes and transition patterns

import { cn } from "@/utils/cn";

// Common animation durations
export const ANIMATION_DURATIONS = {
  fast: "duration-150",
  normal: "duration-300",
  slow: "duration-500",
  slower: "duration-700",
} as const;

// Common easing functions
export const ANIMATION_EASINGS = {
  linear: "ease-linear",
  in: "ease-in",
  out: "ease-out",
  inOut: "ease-in-out",
} as const;

// Base transition classes
export const BASE_TRANSITIONS = {
  all: "transition-all",
  colors: "transition-colors",
  opacity: "transition-opacity",
  transform: "transition-transform",
  shadow: "transition-shadow",
} as const;

// Common transform patterns
export const TRANSFORMS = {
  // Scale animations
  scaleIn: "scale-95",
  scaleNormal: "scale-100",
  scaleOut: "scale-105",

  // Translation animations
  translateUp: "translate-y-2",
  translateDown: "-translate-y-2",
  translateLeft: "translate-x-2",
  translateRight: "-translate-x-2",
  translateNone: "translate-y-0 translate-x-0",

  // Rotation animations
  rotateNone: "rotate-0",
  rotate45: "rotate-45",
  rotate90: "rotate-90",
  rotate180: "rotate-180",
} as const;

// Visibility states
export const VISIBILITY_STATES = {
  visible: "opacity-100",
  hidden: "opacity-0",
  semiVisible: "opacity-75",
  faded: "opacity-50",
} as const;

// Pointer interaction states
export const INTERACTION_STATES = {
  enabled: "",
  disabled: "pointer-events-none",
  clickThrough: "pointer-events-none",
} as const;

/**
 * Generate consistent animation classes for common patterns
 */
export const createAnimationClasses = (
  duration: keyof typeof ANIMATION_DURATIONS = "normal",
  easing: keyof typeof ANIMATION_EASINGS = "out"
) => ({
  base: cn(
    BASE_TRANSITIONS.all,
    ANIMATION_DURATIONS[duration],
    ANIMATION_EASINGS[easing]
  ),
  transform: cn(
    "transform",
    BASE_TRANSITIONS.all,
    ANIMATION_DURATIONS[duration],
    ANIMATION_EASINGS[easing]
  ),
  colors: cn(
    BASE_TRANSITIONS.colors,
    ANIMATION_DURATIONS[duration],
    ANIMATION_EASINGS[easing]
  ),
  opacity: cn(
    BASE_TRANSITIONS.opacity,
    ANIMATION_DURATIONS[duration],
    ANIMATION_EASINGS[easing]
  ),
  shadow: cn(
    BASE_TRANSITIONS.shadow,
    ANIMATION_DURATIONS[duration],
    ANIMATION_EASINGS[easing]
  ),
});

/**
 * Panel animation states for floating overlays
 */
export const createPanelStates = (isOpen: boolean) => ({
  visible: cn(
    isOpen ? VISIBILITY_STATES.visible : VISIBILITY_STATES.hidden,
    isOpen ? TRANSFORMS.scaleNormal : TRANSFORMS.scaleIn,
    isOpen ? TRANSFORMS.translateNone : TRANSFORMS.translateUp,
    isOpen ? INTERACTION_STATES.enabled : INTERACTION_STATES.disabled,
    "transform"
  ),
  base: createAnimationClasses().transform,
});

/**
 * FAB (Floating Action Button) animation states
 */
export const createFABStates = (
  isOpen: boolean,
  isHovered: boolean = false
) => ({
  rotation: isOpen ? TRANSFORMS.rotate45 : TRANSFORMS.rotateNone,
  scale: isHovered ? TRANSFORMS.scaleOut : TRANSFORMS.scaleNormal,
  base: cn(
    "transform",
    createAnimationClasses().base,
    "hover:scale-105",
    "active:scale-95"
  ),
});

/**
 * Card highlight animation (used for scroll-to-card)
 */
export const CARD_HIGHLIGHT_ANIMATION = "card-highlight";

/**
 * Fade in animation for dynamic content
 */
export const FADE_IN_ANIMATION = "animate-fade-in";

/**
 * CSS animation keyframes for fade in effect
 * This replaces the CSS-only version for better consistency
 */
export const fadeInClasses = cn(
  VISIBILITY_STATES.hidden,
  TRANSFORMS.translateUp,
  TRANSFORMS.scaleIn,
  "animate-fade-in"
);

/**
 * Utility to create fade-in animations programmatically
 */
export const createFadeInAnimation = (
  element: HTMLElement,
  duration: number = 300
): Promise<void> => {
  return new Promise((resolve) => {
    // Set initial state
    element.style.opacity = "0";
    element.style.transform = "translateY(10px) scale(0.95)";
    element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;

    // Force reflow
    void element.offsetHeight;

    // Animate to final state
    element.style.opacity = "1";
    element.style.transform = "translateY(0) scale(1)";

    setTimeout(() => {
      // Clean up inline styles
      element.style.opacity = "";
      element.style.transform = "";
      element.style.transition = "";
      resolve();
    }, duration);
  });
};

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
 * Animation utility class generator
 */
export class AnimationBuilder {
  private classes: string[] = [];

  static create() {
    return new AnimationBuilder();
  }

  transition(type: keyof typeof BASE_TRANSITIONS = "all") {
    this.classes.push(BASE_TRANSITIONS[type]);
    return this;
  }

  duration(duration: keyof typeof ANIMATION_DURATIONS = "normal") {
    this.classes.push(ANIMATION_DURATIONS[duration]);
    return this;
  }

  easing(easing: keyof typeof ANIMATION_EASINGS = "out") {
    this.classes.push(ANIMATION_EASINGS[easing]);
    return this;
  }

  transform() {
    this.classes.push("transform");
    return this;
  }

  scale(scale: keyof typeof TRANSFORMS) {
    if (scale.startsWith("scale")) {
      this.classes.push(TRANSFORMS[scale]);
    }
    return this;
  }

  translate(direction: keyof typeof TRANSFORMS) {
    if (direction.startsWith("translate")) {
      this.classes.push(TRANSFORMS[direction]);
    }
    return this;
  }

  rotate(rotation: keyof typeof TRANSFORMS) {
    if (rotation.startsWith("rotate")) {
      this.classes.push(TRANSFORMS[rotation]);
    }
    return this;
  }

  opacity(visibility: keyof typeof VISIBILITY_STATES) {
    this.classes.push(VISIBILITY_STATES[visibility]);
    return this;
  }

  hover(effect: keyof typeof HOVER_EFFECTS) {
    this.classes.push(HOVER_EFFECTS[effect]);
    return this;
  }

  focus(effect: keyof typeof FOCUS_EFFECTS) {
    this.classes.push(FOCUS_EFFECTS[effect]);
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
