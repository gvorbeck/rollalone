// Card drawing utility with deck management and localStorage persistence

import { StorageManager } from "./storage";

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

export interface DeckState {
  availableCards: PlayingCard[];
  drawnCards: PlayingCard[];
  lastDrawn: PlayingCard | null;
  shuffleCount: number;
}

class CardDrawer {
  private static instance: CardDrawer;
  private state: DeckState;
  private storage: StorageManager;

  private constructor() {
    this.storage = new StorageManager({
      key: "rollalone-card-deck",
      version: "1.0",
    });
    this.state = this.storage.load<DeckState>() || this.createFreshDeck();
  }

  public static getInstance(): CardDrawer {
    if (!CardDrawer.instance) {
      CardDrawer.instance = new CardDrawer();
    }
    return CardDrawer.instance;
  }

  private createFreshDeck(): DeckState {
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
    this.shuffleArray(cards);

    return {
      availableCards: cards,
      drawnCards: [],
      lastDrawn: null,
      shuffleCount: 0,
    };
  }

  private shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  public drawCard(): CardDrawResult {
    let deckReshuffled = false;

    // If deck is empty, reshuffle
    if (this.state.availableCards.length === 0) {
      this.reshuffleDeck();
      deckReshuffled = true;
    }

    // Draw the top card
    const drawnCard = this.state.availableCards.pop()!;
    this.state.drawnCards.push(drawnCard);
    this.state.lastDrawn = drawnCard;

    // If it's a joker, automatically reshuffle after this draw
    if (drawnCard.isJoker) {
      setTimeout(() => {
        this.reshuffleDeck();
        this.saveState();
      }, 100);
    }

    this.saveState();

    return {
      card: drawnCard,
      remainingCards: this.state.availableCards.length,
      deckReshuffled,
    };
  }

  public reshuffleDeck(): void {
    // Move all drawn cards back to available cards
    this.state.availableCards = [
      ...this.state.availableCards,
      ...this.state.drawnCards,
    ];
    this.state.drawnCards = [];
    this.state.shuffleCount++;

    // Shuffle the deck
    this.shuffleArray(this.state.availableCards);

    this.saveState();
  }

  public getDeckInfo(): {
    remainingCards: number;
    drawnCards: number;
    lastDrawn: PlayingCard | null;
    shuffleCount: number;
  } {
    return {
      remainingCards: this.state.availableCards.length,
      drawnCards: this.state.drawnCards.length,
      lastDrawn: this.state.lastDrawn,
      shuffleCount: this.state.shuffleCount,
    };
  }

  public getCardMeaning(card: PlayingCard): string {
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
  }

  private saveState(): void {
    this.storage.save(this.state);
  }

  public resetDeck(): void {
    this.state = this.createFreshDeck();
    this.saveState();
  }
}

// Export the singleton instance
export const cardDrawer = CardDrawer.getInstance();
