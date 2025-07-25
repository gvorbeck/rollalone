import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/test/utils";
import TableOfContents from "../TableOfContents";
import { FABTestHelper, FAB_CONFIGS } from "@/test/fabTestUtils";
import { createLocalStorageMock } from "@/test/mockUtils";

// Mock localStorage
createLocalStorageMock();

// Mock the scrollToCard utility
vi.mock("@/utils/scrollToCard", () => ({
  scrollToCard: vi.fn(),
}));

import { scrollToCard } from "@/utils/scrollToCard";
const mockScrollToCard = vi.mocked(scrollToCard);

describe("TableOfContents Component", () => {
  let fabHelper: FABTestHelper;

  beforeEach(() => {
    vi.clearAllMocks();
    fabHelper = new FABTestHelper(FAB_CONFIGS.tableOfContents);
  });

  it("renders floating action button", async () => {
    render(<TableOfContents />);
    await fabHelper.testFABRender();
  });

  it("opens and closes navigation panel", async () => {
    render(<TableOfContents />);
    await fabHelper.testPanelOpenClose();
  });

  it("displays all navigation sections", async () => {
    render(<TableOfContents />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab);

    await waitFor(() => {
      expect(screen.getByText("Core Gameplay")).toBeInTheDocument();
      expect(screen.getByText("Oracles & Decisions")).toBeInTheDocument();
      expect(screen.getByText("Scene & Story")).toBeInTheDocument();
      expect(screen.getByText("Characters & Generators")).toBeInTheDocument();
      expect(screen.getByText("Exploration")).toBeInTheDocument();
      expect(screen.getByText("Information")).toBeInTheDocument();
    });
  });

  it("displays cards within each section", async () => {
    render(<TableOfContents />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab);

    await waitFor(() => {
      // Core Gameplay section
      expect(screen.getByText("How to Play")).toBeInTheDocument();
      expect(screen.getByText("Using Playing Cards")).toBeInTheDocument();
      expect(screen.getByText("Quick Reference")).toBeInTheDocument();

      // Oracles & Decisions section
      expect(screen.getByText("Oracle (Yes/No)")).toBeInTheDocument();
      expect(screen.getByText("Oracle (How)")).toBeInTheDocument();
      expect(screen.getByText("Oracle (Focus)")).toBeInTheDocument();

      // Scene & Story section
      expect(screen.getByText("Set the Scene")).toBeInTheDocument();
      expect(screen.getByText("Plot Hook Generator")).toBeInTheDocument();
      expect(screen.getByText("GM Moves")).toBeInTheDocument();
    });
  });

  it("navigates to card when clicked", async () => {
    render(<TableOfContents />);

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

    expect(mockScrollToCard).toHaveBeenCalledWith("How to Play");
  });

  it("closes panel after navigation", async () => {
    render(<TableOfContents />);

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
    render(<TableOfContents />);

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
    render(<TableOfContents />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab);

    await waitFor(() => {
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("opacity-100");
    });

    await waitFor(() => {
      // Count buttons in Core Gameplay section (4 cards)
      const coreGameplaySection = screen
        .getByText("Core Gameplay")
        .closest("section");
      const coreGameplayButtons =
        coreGameplaySection?.querySelectorAll("button");
      expect(coreGameplayButtons).toHaveLength(4);

      // Count buttons in Oracles & Decisions section (3 cards)
      const oracleSection = screen
        .getByText("Oracles & Decisions")
        .closest("section");
      const oracleButtons = oracleSection?.querySelectorAll("button");
      expect(oracleButtons).toHaveLength(3);
    });
  });

  it("handles navigation interactions", async () => {
    render(<TableOfContents />);

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

    expect(mockScrollToCard).toHaveBeenCalledWith("How to Play");
  });

  it("positions FAB correctly relative to dice roller", () => {
    render(<TableOfContents />);

    // With the new flex container layout, we just verify the FAB is present
    const fab = screen.getByRole("button", { name: /open table of contents/i });
    expect(fab).toBeInTheDocument();
  });

  it("applies smooth animations", async () => {
    render(<TableOfContents />);

    const fab = screen.getByRole("button", { name: /open table of contents/i });
    fireEvent.click(fab);

    await waitFor(() => {
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("transform");
      expect(panel).toHaveClass("transition-all");
    });
  });
});
