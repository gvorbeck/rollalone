import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "@/test/utils";
import App from "@/App";

describe("FAB Context Integration", () => {
  it("should only allow one FAB to be open at a time", () => {
    render(<App />);

    // Get all three FAB buttons
    const tocFAB = screen.getByRole("button", {
      name: /open table of contents/i,
    });
    const cardDrawerFAB = screen.getByRole("button", {
      name: /draw playing card/i,
    });
    const diceRollerFAB = screen.getByRole("button", {
      name: /open dice roller/i,
    });

    // Initially all should be closed
    expect(tocFAB).toHaveAttribute("aria-expanded", "false");

    // Open table of contents
    fireEvent.click(tocFAB);
    expect(tocFAB).toHaveAttribute("aria-expanded", "true");

    // Open card drawer - should close table of contents
    fireEvent.click(cardDrawerFAB);
    expect(tocFAB).toHaveAttribute("aria-expanded", "false");
    // Check if card drawer panel is visible via CSS classes
    expect(screen.getByText("Card Drawer")).toBeInTheDocument();

    // Open dice roller - should close card drawer
    fireEvent.click(diceRollerFAB);
    // Check if dice roller panel is visible and card drawer is closed
    expect(screen.getByText("Quick Dice Roller")).toBeInTheDocument();

    // Card drawer panel is still in DOM but hidden via CSS classes
    const cardDrawerPanel = screen
      .getByText("Card Drawer")
      .closest(".absolute");
    expect(cardDrawerPanel).toHaveClass("opacity-0", "pointer-events-none");
  });

  it("should close FAB when the same FAB is clicked again", () => {
    render(<App />);

    const tocFAB = screen.getByRole("button", {
      name: /open table of contents/i,
    });

    // Open table of contents
    fireEvent.click(tocFAB);
    expect(tocFAB).toHaveAttribute("aria-expanded", "true");

    // Click again to close
    fireEvent.click(tocFAB);
    expect(tocFAB).toHaveAttribute("aria-expanded", "false");
  });
});
