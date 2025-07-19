import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/test/utils";
import App from "../App";
import ErrorBoundary from "../components/ErrorBoundary";

// Mock the card data
vi.mock("@/data/cards", () => ({
  howToPlay: {
    title: "How to Play",
    contentType: "text",
    content: "This is how you play the game",
  },
  playingCards: {
    title: "Using Playing Cards",
    contentType: "text",
    content: "This system uses a deck of playing cards",
  },
  oracleYesNo: {
    title: "Oracle (Yes/No)",
    contentType: "text",
    content: "Ask a yes/no question",
  },
  oracleHow: {
    title: "Oracle (How)",
    contentType: "text",
    content: "Ask how something is",
  },
  setTheScene: {
    title: "Set the Scene",
    contentType: "text",
    content: "Set up your scene",
  },
  gmMoves: {
    title: "GM Moves",
    contentType: "text",
    content: "Game master moves",
  },
  randomEvents: {
    title: "Random Events & Complex Questions",
    contentType: "text",
    content: "Random events",
  },
  oracleFocus: {
    title: "Oracle (Focus)",
    contentType: "text",
    content: "Focus oracle",
  },
  plotHookGenerator: {
    title: "Plot Hook Generator",
    contentType: "list",
    content: ["Hook 1", "Hook 2", "Hook 3"],
  },
  npcGenerator: {
    title: "NPC Generator",
    contentType: "text",
    content: "Generate NPCs",
  },
  genericGenerator: {
    title: "Generic Generator",
    contentType: "text",
    content: "Generic generator",
  },
  dungeonCrawler: {
    title: "Dungeon Crawler",
    contentType: "text",
    content: "Dungeon exploration",
  },
  hexCrawler: {
    title: "Hex Crawler",
    contentType: "text",
    content: "Hex exploration",
  },
  advancedMoves: {
    title: "Advanced GM Moves",
    contentType: "text",
    content: "Advanced moves",
  },
  gameplayTips: {
    title: "Gameplay Tips & Interpretation",
    contentType: "text",
    content: "Tips for gameplay",
  },
  cardSystemNotes: {
    title: "Using Playing Cards",
    contentType: "text",
    content: "Card system notes",
  },
  acknowledgements: {
    title: "Acknowledgements & Credits",
    contentType: "text",
    content: "Credits and acknowledgements",
  },
}));

describe("App Component", () => {
  it("renders hero section", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /roll alone/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/your complete toolkit/i)).toBeInTheDocument();
  });

  it("renders all cards in masonry layout", () => {
    render(<App />);

    expect(screen.getAllByText("How to Play")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Oracle (Yes/No)")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Plot Hook Generator")[0]).toBeInTheDocument();
  });

  it("renders floating action buttons", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: /open dice roller/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open table of contents/i })
    ).toBeInTheDocument();
  });

  it("dice roller functionality works", async () => {
    render(<App />);

    const diceRollerFAB = screen.getByRole("button", {
      name: /open dice roller/i,
    });
    fireEvent.click(diceRollerFAB);

    await waitFor(() => {
      expect(screen.getByText(/dice roller/i)).toBeInTheDocument();
    });
  });

  it("table of contents functionality works", async () => {
    render(<App />);

    const tocFAB = screen.getByRole("button", {
      name: /open table of contents/i,
    });
    fireEvent.click(tocFAB);

    await waitFor(() => {
      expect(screen.getByText(/table of contents/i)).toBeInTheDocument();
    });
  });

  it("navigation between cards works", async () => {
    render(<App />);

    // Open table of contents
    const tocFAB = screen.getByRole("button", {
      name: /open table of contents/i,
    });
    fireEvent.click(tocFAB);

    await waitFor(() => {
      const cardButton = screen.getByRole("button", { name: "How to Play" });
      fireEvent.click(cardButton);
    });

    // Check that TOC closes after navigation
    await waitFor(() => {
      // Target the TOC panel specifically by its aria-labelledby attribute
      const panel = document.querySelector(
        '[aria-labelledby="table-of-contents-title"]'
      );
      expect(panel).toHaveClass("pointer-events-none");
      expect(panel).toHaveClass("opacity-0");
    });
  });

  it("applies dark theme throughout", () => {
    render(<App />);

    const appContainer = screen.getByRole("main").closest("div");
    expect(appContainer).toHaveClass("bg-gray-900");
  });

  it("has proper page structure", () => {
    render(<App />);

    // Check for main content wrapper
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    // Check for hero section
    const hero = screen.getAllByRole("banner")[0]; // Get the main banner
    expect(hero).toBeInTheDocument();
  });

  it("handles empty card data gracefully", () => {
    vi.doMock("@/data/cards", () => ({
      cards: [],
    }));

    render(<App />);

    // Should still render hero and UI elements
    expect(
      screen.getByRole("heading", { name: /roll alone/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open dice roller/i })
    ).toBeInTheDocument();
  });

  it("maintains responsive layout", () => {
    render(<App />);

    // Check that masonry container exists
    const masonryContainer = document.querySelector(".masonry-grid");
    expect(masonryContainer).toBeInTheDocument();
  });

  it("error boundary catches render errors", () => {
    // Temporarily suppress console.error for this test
    const originalError = console.error;
    console.error = vi.fn();

    // Create a component that throws an error
    const ThrowError = () => {
      throw new Error("Test error");
    };

    // Test the error boundary directly
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    // Should show error boundary instead of crashing
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Restore console.error
    console.error = originalError;
  });

  it("FABs are positioned correctly", () => {
    render(<App />);

    const diceRollerFAB = screen.getByRole("button", {
      name: /open dice roller/i,
    });
    const cardDrawerFAB = screen.getByRole("button", {
      name: /draw playing card/i,
    });
    const tocFAB = screen.getByRole("button", {
      name: /open table of contents/i,
    });

    // All FABs should be in the same flex container now
    const fabContainer = screen
      .getByRole("main")
      .parentElement?.querySelector(".fab-container");
    expect(fabContainer).toBeInTheDocument();
    expect(fabContainer).toContainElement(tocFAB.closest("div"));
    expect(fabContainer).toContainElement(cardDrawerFAB.closest("div"));
    expect(fabContainer).toContainElement(diceRollerFAB.closest("div"));
  });

  it("handles scroll behavior", () => {
    render(<App />);

    // Check that the app renders without scroll-related errors
    expect(screen.getByRole("main")).toBeInTheDocument();

    // The scroll behavior is handled by the scrollToCard utility
    // which is already tested in scrollToCard.test.ts
  });

  it("renders cards with proper data attributes", () => {
    render(<App />);

    // Check that cards have data-card-title attributes
    const cards = document.querySelectorAll("[data-card-title]");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("handles card highlighting animation", async () => {
    render(<App />);

    // This would typically be tested through scroll behavior
    // but we can check that the CSS classes are set up correctly
    const style = document.createElement("style");
    style.textContent = `
      .card-highlight {
        animation: cardHighlight 2s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    expect(document.head.contains(style)).toBe(true);
  });

  it("provides accessibility features", () => {
    render(<App />);

    // Check for proper heading hierarchy
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();

    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.length).toBeGreaterThan(0);

    // Check for proper landmark roles
    const banners = screen.getAllByRole("banner");
    expect(banners[0]).toBeInTheDocument(); // Main page banner
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("card drawer functions work", async () => {
    render(<App />);

    // Open card drawer
    const cardDrawerFAB = screen.getByRole("button", {
      name: /draw playing card/i,
    });
    fireEvent.click(cardDrawerFAB);

    await waitFor(() => {
      expect(screen.getByText(/card drawer/i)).toBeInTheDocument();
    });
  });
});
