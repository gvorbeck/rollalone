// Utility to scroll to cards and highlight them with animations
// Handles internal links and card navigation

import { errorHandlers } from "./errorHandling";
import { triggerAnimation, CARD_HIGHLIGHT_ANIMATION } from "./animations";

// Internal link mappings for common card references
const INTERNAL_LINK_MAPPINGS: Record<string, string> = {
  "PLOT HOOK": "Plot Hook Generator",
  "RANDOM EVENT": "Random Events & Complex Questions",
  "SET THE SCENE": "Set the Scene",
  "GM MOVES": "GM Moves",
  "ORACLE (FOCUS)": "Oracle (Focus)",
  "ORACLE (HOW)": "Oracle (How)",
  "ORACLE (YES/NO)": "Oracle (Yes/No)",
  ORACLE: "Oracle (Yes/No)",
  "ACTION FOCUS": "Oracle (Focus)",
  "DETAIL FOCUS": "Oracle (Focus)",
  "TOPIC FOCUS": "Oracle (Focus)",
};

/**
 * Find a card element by its title
 */
const findCardElement = (cardTitle: string): Element | null => {
  return errorHandlers.dom.querySelector(`[data-card-title="${cardTitle}"]`);
};

/**
 * Scroll to element with smooth behavior
 */
const scrollToElement = (element: Element): boolean => {
  return errorHandlers.dom.scrollToElement(element, {
    behavior: "smooth",
    block: "start",
  });
};

/**
 * Highlight a card with animation
 */
const highlightCard = async (cardElement: HTMLElement): Promise<void> => {
  await triggerAnimation(cardElement, CARD_HIGHLIGHT_ANIMATION, 1500);
};

/**
 * Main scroll to card function
 * @param cardTitle - The title of the card to scroll to
 */
export const scrollToCard = async (cardTitle: string): Promise<void> => {
  if (!cardTitle?.trim()) {
    return;
  }

  // Check if it's an internal link mapping
  const mappedTitle =
    INTERNAL_LINK_MAPPINGS[cardTitle.toUpperCase()] || cardTitle;

  // Find the card element
  const cardElement = findCardElement(mappedTitle);

  if (!cardElement) {
    console.warn(`Could not find card with title "${mappedTitle}"`);
    return;
  }

  // Scroll to the card
  const scrolled = scrollToElement(cardElement);

  if (scrolled && cardElement instanceof HTMLElement) {
    // Highlight the card after scrolling
    await highlightCard(cardElement);
  }
};
