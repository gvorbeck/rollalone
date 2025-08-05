// Card drawing utility with deck management

import { saveToStorage, loadFromStorage } from "./storage";

export interface PlayingCard {
  rank: string;
  suit: string;
  value: number; // 1-13 (Ace=1, Jack=11, Queen=12, King=13)
  display: string; // e.g., "A♠", "K♥", "Joker"
  isJoker: boolean;
}

export interface CardDrawResult {
  card: PlayingCard;
  remainingCards: number;
  deckReshuffled: boolean;
}

interface DeckState {
  availableCards: PlayingCard[];
  drawnCards: PlayingCard[];
  lastDrawn: PlayingCard | null;
  shuffleCount: number;
}

const STORAGE_KEY = "rollalone-card-deck";

let deckState: DeckState | null = null;

const shuffleArray = <T>(array: T[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const createFreshDeck = (): DeckState => {
  const suits = ["♠", "♣", "♥", "♦"];
  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const cards: PlayingCard[] = [];

  // Add regular cards
  suits.forEach((suit) => {
    ranks.forEach((rank, index) => {
      cards.push({
        rank,
        suit,
        value: index + 1,
        display: `${rank}${suit}`,
        isJoker: false,
      });
    });
  });

  // Add jokers
  cards.push({
    rank: "Joker",
    suit: "",
    value: 0,
    display: "Joker",
    isJoker: true,
  });
  cards.push({
    rank: "Joker",
    suit: "",
    value: 0,
    display: "Joker",
    isJoker: true,
  });

  // Shuffle the deck
  shuffleArray(cards);

  return {
    availableCards: cards,
    drawnCards: [],
    lastDrawn: null,
    shuffleCount: 0,
  };
};

const getState = (): DeckState => {
  if (deckState === null) {
    const loaded = loadFromStorage(STORAGE_KEY, createFreshDeck());

    // Simple validation - if arrays don't exist, create fresh deck
    if (
      !loaded ||
      !Array.isArray(loaded.availableCards) ||
      !Array.isArray(loaded.drawnCards)
    ) {
      deckState = createFreshDeck();
    } else {
      deckState = loaded;
    }
  }
  return deckState;
};

const saveState = (): void => {
  if (deckState) {
    saveToStorage(STORAGE_KEY, deckState);
  }
};

export const cardDrawer = {
  drawCard(): CardDrawResult {
    const state = getState();
    let deckReshuffled = false;

    // If deck is empty, reshuffle
    if (state.availableCards.length === 0) {
      this.reshuffleDeck();
      deckReshuffled = true;
    }

    // Draw the top card
    const drawnCard = state.availableCards.pop()!;
    state.drawnCards.push(drawnCard);
    state.lastDrawn = drawnCard;

    // If it's a joker, automatically reshuffle after this draw
    if (drawnCard.isJoker) {
      setTimeout(() => {
        this.reshuffleDeck();
        saveState();
      }, 100);
    }

    saveState();

    return {
      card: drawnCard,
      remainingCards: state.availableCards.length,
      deckReshuffled,
    };
  },

  reshuffleDeck(): void {
    const state = getState();

    // Move all drawn cards back to available cards
    state.availableCards = [...state.availableCards, ...state.drawnCards];
    state.drawnCards = [];
    state.shuffleCount++;

    // Shuffle the deck
    shuffleArray(state.availableCards);
    saveState();
  },

  getDeckInfo(): {
    remainingCards: number;
    drawnCards: number;
    lastDrawn: PlayingCard | null;
    shuffleCount: number;
  } {
    const state = getState();

    return {
      remainingCards: state.availableCards?.length || 0,
      drawnCards: state.drawnCards?.length || 0,
      lastDrawn: state.lastDrawn || null,
      shuffleCount: state.shuffleCount || 0,
    };
  },

  getCardMeaning(card: PlayingCard): string {
    if (card.isJoker) {
      return "Shuffle the deck and add a RANDOM EVENT";
    }

    const suitMeaning = {
      "♠": "Physical (appearance, existence)",
      "♦": "Technical (mental, operation)",
      "♣": "Mystical (meaning, capability)",
      "♥": "Social (personal, connection)",
    };

    return `${card.display} - ${
      suitMeaning[card.suit as keyof typeof suitMeaning] || "Unknown suit"
    }`;
  },

  resetDeck(): void {
    deckState = createFreshDeck();
    saveState();
  },
};
