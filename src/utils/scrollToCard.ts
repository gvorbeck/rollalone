// Utility functions for scrolling to cards and highlighting them

// Map of card link text to actual card titles
const CARD_LINK_MAP: Record<string, string> = {
  "PLOT HOOK": "Plot Hook Generator",
  "RANDOM EVENT": "Random Events & Complex Questions",
  "SET THE SCENE": "Set the Scene",
  "GM MOVES": "GM Moves",
};

/**
 * Scrolls to a card by its title and highlights it
 * @param linkText - The text that was clicked (e.g., "PLOT HOOK")
 */
export const scrollToCard = (linkText: string): void => {
  const cardTitle = CARD_LINK_MAP[linkText];
  if (!cardTitle) {
    console.warn(`No card mapping found for "${linkText}"`);
    return;
  }

  // Find the card element by its title
  const cardElements = document.querySelectorAll("[data-card-title]");
  let targetCard: Element | null = null;

  for (const card of cardElements) {
    if (card.getAttribute("data-card-title") === cardTitle) {
      targetCard = card;
      break;
    }
  }

  if (!targetCard) {
    console.warn(`Could not find card with title "${cardTitle}"`);
    return;
  }

  // Scroll to the card with smooth animation
  targetCard.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // Add highlight animation
  highlightCard(targetCard as HTMLElement);
};

/**
 * Adds a highlight animation to a card element
 * @param cardElement - The card DOM element to highlight
 */
const highlightCard = (cardElement: HTMLElement): void => {
  // Remove any existing highlight
  cardElement.classList.remove("card-highlight");

  // Force a reflow to ensure the class removal takes effect
  void cardElement.offsetHeight;

  // Add the highlight class
  cardElement.classList.add("card-highlight");

  // Remove the highlight class after animation completes
  setTimeout(() => {
    cardElement.classList.remove("card-highlight");
  }, 1500); // 1.5 seconds to match the CSS animation duration
};
