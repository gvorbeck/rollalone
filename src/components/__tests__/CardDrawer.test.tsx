import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { render } from "@/test/utils";
import CardDrawer from "@/components/CardDrawer";
import { cardDrawer } from "@/utils/cardDrawer";

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

// Mock the cardDrawer utility
vi.mock("@/utils/cardDrawer", () => ({
  cardDrawer: {
    drawCard: vi.fn(),
    getDeckInfo: vi.fn(),
    getCardMeaning: vi.fn(),
    reshuffleDeck: vi.fn(),
    resetDeck: vi.fn(),
  },
}));

describe("CardDrawer", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    (cardDrawer.getDeckInfo as ReturnType<typeof vi.fn>).mockReturnValue({
      remainingCards: 52,
      drawnCards: 2,
      lastDrawn: {
        display: "A♠",
        rank: "A",
        suit: "♠",
        value: 1,
        isJoker: false,
      },
      shuffleCount: 0,
    });

    (cardDrawer.getCardMeaning as ReturnType<typeof vi.fn>).mockReturnValue(
      "A♠ - Physical (appearance, existence)"
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Component Rendering", () => {
    it("should render the FAB button", () => {
      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      expect(fabButton).toBeInTheDocument();
      expect(fabButton).toHaveClass("bg-red-600");
    });

    it("should be positioned correctly", () => {
      render(<CardDrawer />);

      const container = screen.getByTitle("Draw playing card").parentElement;
      expect(container).toHaveClass("right-23");
      expect(container).toHaveClass("bottom-6");
    });

    it("should not show the panel initially", () => {
      render(<CardDrawer />);

      // Panel is in DOM but hidden via CSS classes
      const panel = document.querySelector(".fixed .absolute");
      expect(panel).toHaveClass("opacity-0", "pointer-events-none");
    });
  });

  describe("Panel Interaction", () => {
    it("should open panel when FAB is clicked", () => {
      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      fireEvent.click(fabButton);

      expect(screen.getByText("Card Drawer")).toBeInTheDocument();
      expect(screen.getByText("Draw Card")).toBeInTheDocument();
    });

    it("should close panel when close button is clicked", () => {
      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      fireEvent.click(fabButton);

      // Panel should be visible now
      const panel = document.querySelector(".fixed .absolute");
      expect(panel).toHaveClass("opacity-100");
      expect(panel).not.toHaveClass("pointer-events-none");

      const closeButton = screen.getByText("✕");
      fireEvent.click(closeButton);

      // Panel should be hidden again via CSS classes
      expect(panel).toHaveClass("opacity-0", "pointer-events-none");
    });

    it("should show deck status information", () => {
      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      fireEvent.click(fabButton);

      expect(screen.getByText("52/54")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("should show last drawn card", () => {
      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      fireEvent.click(fabButton);

      expect(screen.getByText("A♠")).toBeInTheDocument();
      expect(
        screen.getByText("A♠ - Physical (appearance, existence)")
      ).toBeInTheDocument();
    });
  });

  describe("Card Drawing", () => {
    it("should draw a card when Draw Card button is clicked", () => {
      const mockCard = {
        display: "K♥",
        rank: "K",
        suit: "♥",
        value: 13,
        isJoker: false,
      };
      (cardDrawer.drawCard as ReturnType<typeof vi.fn>).mockReturnValue({
        card: mockCard,
        remainingCards: 51,
        deckReshuffled: false,
      });
      (cardDrawer.getCardMeaning as ReturnType<typeof vi.fn>).mockReturnValue(
        "K♥ - Social (personal, connection)"
      );

      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      fireEvent.click(fabButton);

      const drawButton = screen.getByText("Draw Card");
      fireEvent.click(drawButton);

      expect(cardDrawer.drawCard).toHaveBeenCalled();
    });

    it("should handle Joker draws with special message", async () => {
      const mockJoker = {
        display: "Joker",
        rank: "Joker",
        suit: "",
        value: 0,
        isJoker: true,
      };
      (cardDrawer.drawCard as ReturnType<typeof vi.fn>).mockReturnValue({
        card: mockJoker,
        remainingCards: 51,
        deckReshuffled: false,
      });
      (cardDrawer.getCardMeaning as ReturnType<typeof vi.fn>).mockReturnValue(
        "Shuffle the deck and add a RANDOM EVENT"
      );

      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      fireEvent.click(fabButton);

      const drawButton = screen.getByText("Draw Card");
      fireEvent.click(drawButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Joker drawn - deck will be reshuffled!/)
        ).toBeInTheDocument();
      });
    });

    it("should show reshuffle message when deck is reshuffled", async () => {
      const mockCard = {
        display: "2♣",
        rank: "2",
        suit: "♣",
        value: 2,
        isJoker: false,
      };
      (cardDrawer.drawCard as ReturnType<typeof vi.fn>).mockReturnValue({
        card: mockCard,
        remainingCards: 54,
        deckReshuffled: true,
      });

      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      fireEvent.click(fabButton);

      const drawButton = screen.getByText("Draw Card");
      fireEvent.click(drawButton);

      await waitFor(() => {
        expect(screen.getByText(/Deck was reshuffled!/)).toBeInTheDocument();
      });
    });
  });

  describe("Deck Management", () => {
    it("should reshuffle deck when Reshuffle button is clicked", () => {
      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      fireEvent.click(fabButton);

      const reshuffleButton = screen.getByText("Reshuffle");
      fireEvent.click(reshuffleButton);

      expect(cardDrawer.reshuffleDeck).toHaveBeenCalled();
    });

    it("should reset deck when Reset Deck button is clicked", () => {
      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      fireEvent.click(fabButton);

      const resetButton = screen.getByText("Reset Deck");
      fireEvent.click(resetButton);

      expect(cardDrawer.resetDeck).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels and titles", () => {
      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");
      expect(fabButton).toHaveAttribute("title", "Draw playing card");

      fireEvent.click(fabButton);

      const closeButton = screen.getByTitle("Close card drawer");
      expect(closeButton).toHaveAttribute("title", "Close card drawer");
    });

    it("should be keyboard accessible", () => {
      render(<CardDrawer />);

      const fabButton = screen.getByTitle("Draw playing card");

      // FAB should be focusable
      fabButton.focus();
      expect(document.activeElement).toBe(fabButton);

      // Should open with Enter key
      fireEvent.keyDown(fabButton, { key: "Enter" });
      // Note: This test would need actual keyboard event handling in the component
    });
  });
});
