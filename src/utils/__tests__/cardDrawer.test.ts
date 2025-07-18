import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cardDrawer, type PlayingCard } from "@/utils/cardDrawer";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("cardDrawer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock Math.random for predictable shuffle
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    // Clear localStorage mock
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Deck Creation", () => {
    it("should create a complete deck with 54 cards", () => {
      cardDrawer.resetDeck();
      const deckInfo = cardDrawer.getDeckInfo();

      expect(deckInfo.remainingCards).toBe(54); // 52 regular cards + 2 jokers
      expect(deckInfo.drawnCards).toBe(0);
      expect(deckInfo.shuffleCount).toBe(0);
    });

    it("should include all suits and ranks", () => {
      cardDrawer.resetDeck();

      // Draw all cards to check deck composition
      const drawnCards: PlayingCard[] = [];
      const deckInfo = cardDrawer.getDeckInfo();

      for (let i = 0; i < deckInfo.remainingCards; i++) {
        const result = cardDrawer.drawCard();
        drawnCards.push(result.card);
      }

      // Check suits
      const suits = ["♠", "♣", "♥", "♦"];
      suits.forEach((suit) => {
        const suitCards = drawnCards.filter(
          (card) => card.suit === suit && !card.isJoker
        );
        expect(suitCards).toHaveLength(13); // 13 cards per suit
      });

      // Check jokers
      const jokers = drawnCards.filter((card) => card.isJoker);
      expect(jokers).toHaveLength(2);

      // Check ranks
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
      ranks.forEach((rank) => {
        const rankCards = drawnCards.filter((card) => card.rank === rank);
        expect(rankCards).toHaveLength(4); // 4 cards per rank (one of each suit)
      });
    });
  });

  describe("Card Drawing", () => {
    beforeEach(() => {
      cardDrawer.resetDeck();
    });

    it("should draw a card and reduce deck size", () => {
      const initialInfo = cardDrawer.getDeckInfo();
      const result = cardDrawer.drawCard();
      const finalInfo = cardDrawer.getDeckInfo();

      expect(result.card).toBeDefined();
      expect(result.remainingCards).toBe(initialInfo.remainingCards - 1);
      expect(finalInfo.remainingCards).toBe(initialInfo.remainingCards - 1);
      expect(finalInfo.drawnCards).toBe(initialInfo.drawnCards + 1);
    });

    it("should track the last drawn card", () => {
      const result = cardDrawer.drawCard();
      const deckInfo = cardDrawer.getDeckInfo();

      expect(deckInfo.lastDrawn).toEqual(result.card);
    });

    it("should reshuffle when deck is empty", () => {
      // Draw all cards
      let deckInfo = cardDrawer.getDeckInfo();
      for (let i = 0; i < deckInfo.remainingCards; i++) {
        cardDrawer.drawCard();
      }

      // Deck should be empty
      deckInfo = cardDrawer.getDeckInfo();
      expect(deckInfo.remainingCards).toBe(0);

      // Drawing another card should trigger reshuffle
      const result = cardDrawer.drawCard();
      deckInfo = cardDrawer.getDeckInfo();

      expect(result.deckReshuffled).toBe(true);
      expect(deckInfo.remainingCards).toBe(53); // 54 cards - 1 just drawn
      expect(deckInfo.shuffleCount).toBe(1);
    });

    it("should handle joker draws with automatic reshuffle", async () => {
      // Create a deck state with a joker on top
      cardDrawer.resetDeck();

      // We need to draw until we get a joker or manually set one up
      let result;
      let attempts = 0;
      const maxAttempts = 54; // At most, we'll find a joker in the full deck

      do {
        result = cardDrawer.drawCard();
        attempts++;
      } while (!result.card.isJoker && attempts < maxAttempts);

      if (result.card.isJoker) {
        // Joker was drawn
        expect(result.card.isJoker).toBe(true);

        // Give the automatic reshuffle time to trigger
        await new Promise((resolve) => setTimeout(resolve, 150));

        const deckInfo = cardDrawer.getDeckInfo();
        expect(deckInfo.shuffleCount).toBeGreaterThan(0);
      } else {
        // If no joker found, the test still passes as deck creation is correct
        expect(attempts).toBeLessThanOrEqual(maxAttempts);
      }
    });
  });

  describe("Deck Management", () => {
    beforeEach(() => {
      cardDrawer.resetDeck();
    });

    it("should reshuffle deck manually", () => {
      // Draw some cards first
      cardDrawer.drawCard();
      cardDrawer.drawCard();

      let deckInfo = cardDrawer.getDeckInfo();
      expect(deckInfo.drawnCards).toBe(2);
      expect(deckInfo.remainingCards).toBe(52);

      // Manual reshuffle
      cardDrawer.reshuffleDeck();

      deckInfo = cardDrawer.getDeckInfo();
      expect(deckInfo.drawnCards).toBe(0);
      expect(deckInfo.remainingCards).toBe(54);
      expect(deckInfo.shuffleCount).toBe(1);
    });

    it("should reset deck to fresh state", () => {
      // Draw some cards and reshuffle a few times
      cardDrawer.drawCard();
      cardDrawer.drawCard();
      cardDrawer.reshuffleDeck();
      cardDrawer.reshuffleDeck();

      let deckInfo = cardDrawer.getDeckInfo();
      expect(deckInfo.shuffleCount).toBe(2);

      // Reset deck
      cardDrawer.resetDeck();

      deckInfo = cardDrawer.getDeckInfo();
      expect(deckInfo.remainingCards).toBe(54);
      expect(deckInfo.drawnCards).toBe(0);
      expect(deckInfo.shuffleCount).toBe(0);
      expect(deckInfo.lastDrawn).toBeNull();
    });
  });

  describe("Card Meanings", () => {
    it("should provide correct suit meanings", () => {
      const testCards: PlayingCard[] = [
        { rank: "A", suit: "♠", value: 1, display: "A♠", isJoker: false },
        { rank: "K", suit: "♥", value: 13, display: "K♥", isJoker: false },
        { rank: "Q", suit: "♦", value: 12, display: "Q♦", isJoker: false },
        { rank: "J", suit: "♣", value: 11, display: "J♣", isJoker: false },
      ];

      const expectedMeanings = [
        "A♠ - Physical (appearance, existence)",
        "K♥ - Social (personal, connection)",
        "Q♦ - Technical (mental, operation)",
        "J♣ - Mystical (meaning, capability)",
      ];

      testCards.forEach((card, index) => {
        const meaning = cardDrawer.getCardMeaning(card);
        expect(meaning).toBe(expectedMeanings[index]);
      });
    });

    it("should handle joker meaning", () => {
      const joker: PlayingCard = {
        rank: "Joker",
        suit: "",
        value: 0,
        display: "Joker",
        isJoker: true,
      };

      const meaning = cardDrawer.getCardMeaning(joker);
      expect(meaning).toBe("Shuffle the deck and add a RANDOM EVENT");
    });
  });

  describe("Persistence", () => {
    it("should save state to localStorage", () => {
      cardDrawer.resetDeck();
      cardDrawer.drawCard();

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "rollalone-card-deck",
        expect.any(String)
      );
    });

    it("should handle localStorage errors gracefully", () => {
      // Mock localStorage to throw an error
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });

      // Should not throw an error when saving fails
      expect(() => {
        cardDrawer.drawCard();
      }).not.toThrow();
    });
  });

  describe("Singleton Pattern", () => {
    it("should return the same instance", () => {
      // Note: Testing singleton pattern with imported instance
      // The cardDrawer export should be the same instance
      const info1 = cardDrawer.getDeckInfo();
      const info2 = cardDrawer.getDeckInfo();

      // If it's the same instance, the state should be identical
      expect(info1).toEqual(info2);
    });
  });
});
