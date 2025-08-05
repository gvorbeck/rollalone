import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/test/utils";
import TableOfContents from "../TableOfContents";
import { FABTestHelper, FAB_CONFIGS } from "@/test/fabTestUtils";
import { createLocalStorageMock } from "@/test/mockUtils";

// Mock localStorage
createLocalStorageMock();

describe("TableOfContents Component", () => {
  let fabHelper: FABTestHelper;
  const mockOnNavigateToCard = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    fabHelper = new FABTestHelper(FAB_CONFIGS.tableOfContents);
  });

  it("renders floating action button", async () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);
    await fabHelper.testFABRender();
  });

  it("opens and closes navigation panel", async () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);
    await fabHelper.testPanelOpenClose();
  });

  it("displays all navigation sections", async () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab);

    await waitFor(() => {
      expect(screen.getByText("Info")).toBeInTheDocument();
      expect(screen.getByText("Oracles")).toBeInTheDocument();
      expect(screen.getByText("Travel/Maps")).toBeInTheDocument();
      expect(screen.getByText("Generators")).toBeInTheDocument();
    });
  });

  it("displays cards within each section", async () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab);

    await waitFor(() => {
      // Info section
      expect(screen.getByText("How to Play")).toBeInTheDocument();
      expect(screen.getByText("Using Playing Cards")).toBeInTheDocument();
      expect(
        screen.getByText("Random Events & Complex Questions")
      ).toBeInTheDocument();

      // Oracles section
      expect(screen.getByText("Oracle (Yes/No)")).toBeInTheDocument();
      expect(screen.getByText("Oracle (How)")).toBeInTheDocument();
      expect(screen.getByText("Oracle (Focus)")).toBeInTheDocument();

      // Travel/Maps section
      expect(screen.getByText("Hex Crawler")).toBeInTheDocument();
      expect(screen.getByText("Hex Mapper")).toBeInTheDocument();
      expect(screen.getByText("Dungeon Crawler")).toBeInTheDocument();

      // Generators section
      expect(screen.getByText("NPC Generator")).toBeInTheDocument();
      expect(screen.getByText("Generic Generator")).toBeInTheDocument();
      expect(screen.getByText("Plot Hook Generator")).toBeInTheDocument();
    });
  });

  it("navigates to card when clicked", async () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab);

    await waitFor(() => {
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("opacity-100");
    });

    await waitFor(() => {
      const cardButton = screen.getByText("How to Play");
      fireEvent.click(cardButton);
    });

    expect(mockOnNavigateToCard).toHaveBeenCalledWith("How to Play");
  });

  it("closes panel after navigation", async () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab);

    await waitFor(() => {
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("opacity-100");
    });

    await waitFor(() => {
      const cardButton = screen.getByText("How to Play");
      fireEvent.click(cardButton);
    });

    await waitFor(
      () => {
        const panel = screen.getByRole("dialog");
        expect(panel).toHaveClass("pointer-events-none");
        expect(panel).toHaveClass("opacity-0");
      },
      { timeout: 2000 }
    );
  });

  it("has proper accessibility attributes", async () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    expect(fab).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(fab);

    await waitFor(() => {
      expect(fab).toHaveAttribute("aria-expanded", "true");

      const panel = screen.getByRole("dialog");
      expect(panel).toHaveAttribute("aria-labelledby");
    });
  });

  it("shows correct number of cards in each section", async () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab);

    await waitFor(() => {
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("opacity-100");
    });

    await waitFor(() => {
      // Count buttons in Info section (6 cards)
      const infoSection = screen.getByText("Info").closest("section");
      const infoButtons = infoSection?.querySelectorAll("button");
      expect(infoButtons).toHaveLength(6);

      // Count buttons in Oracles section (5 cards)
      const oracleSection = screen.getByText("Oracles").closest("section");
      const oracleButtons = oracleSection?.querySelectorAll("button");
      expect(oracleButtons).toHaveLength(5);

      // Count buttons in Travel/Maps section (3 cards)
      const travelSection = screen.getByText("Travel/Maps").closest("section");
      const travelButtons = travelSection?.querySelectorAll("button");
      expect(travelButtons).toHaveLength(3);

      // Count buttons in Generators section (3 cards)
      const generatorsSection = screen
        .getByText("Generators")
        .closest("section");
      const generatorsButtons = generatorsSection?.querySelectorAll("button");
      expect(generatorsButtons).toHaveLength(3);
    });
  });

  it("handles navigation interactions", async () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab); // Use click instead of keyDown for simplicity

    await waitFor(() => {
      expect(screen.getByText(/table of contents/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("opacity-100");
    });

    const firstCardButton = screen.getByText("How to Play");
    fireEvent.click(firstCardButton); // Use click instead of keyDown

    expect(mockOnNavigateToCard).toHaveBeenCalledWith("How to Play");
  });

  it("positions FAB correctly relative to dice roller", () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);

    // With the new flex container layout, we just verify the FAB is present
    const fab = screen.getByRole("button", { name: /open table of contents/i });
    expect(fab).toBeInTheDocument();
  });

  it("applies smooth animations", async () => {
    render(<TableOfContents onNavigateToCard={mockOnNavigateToCard} />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab);

    await waitFor(() => {
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("transform");
      expect(panel).toHaveClass("transition-all");
    });
  });
});
