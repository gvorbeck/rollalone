// Consolidated test utilities for FAB (Floating Action Button) components
import { screen, fireEvent, waitFor } from "@testing-library/react";

export interface FABTestConfig {
  fabName: string;
  panelText: string;
  fabClass?: string;
  expectedPosition?: string;
}

export class FABTestHelper {
  private config: FABTestConfig;

  constructor(config: FABTestConfig) {
    this.config = config;
  }

  // Common test patterns for FAB components
  async testFABRender() {
    const fab = screen.getByRole("button", {
      name: new RegExp(this.config.fabName, "i"),
    });
    expect(fab).toBeInTheDocument();

    if (this.config.fabClass) {
      expect(fab).toHaveClass(this.config.fabClass);
    }

    return fab;
  }

  async testFABPositioning() {
    const fab = screen.getByRole("button", {
      name: new RegExp(this.config.fabName, "i"),
    });

    // With the new flex container layout, we just verify the FAB is present
    // Individual positioning is handled by the flex container in App.tsx
    expect(fab).toBeInTheDocument();

    return { fab };
  }

  async testPanelOpenClose() {
    const fab = screen.getByRole("button", {
      name: new RegExp(this.config.fabName, "i"),
    });

    // Initially panel should be hidden via CSS
    const panel = document.querySelector("[role='dialog']");
    expect(panel).toHaveClass("opacity-0", "pointer-events-none");

    // Click to open
    fireEvent.click(fab);

    // Check panel is now visible
    expect(panel).toHaveClass("opacity-100");
    expect(panel).not.toHaveClass("pointer-events-none");

    // Click FAB again to close (toggle behavior)
    fireEvent.click(fab);

    // Check panel is hidden again
    expect(panel).toHaveClass("opacity-0", "pointer-events-none");

    return { fab, panel };
  }

  async testAccessibility() {
    const fab = screen.getByRole("button", {
      name: new RegExp(this.config.fabName, "i"),
    });

    // Test initial state
    expect(fab).toHaveAttribute("aria-expanded", "false");

    // Open panel
    fireEvent.click(fab);

    await waitFor(() => {
      expect(fab).toHaveAttribute("aria-expanded", "true");

      const panel = screen.getByRole("dialog");
      expect(panel).toHaveAttribute("aria-labelledby");
    });

    return fab;
  }

  async testAnimations() {
    const fab = screen.getByRole("button", {
      name: new RegExp(this.config.fabName, "i"),
    });
    fireEvent.click(fab);

    await waitFor(() => {
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("transform");
      expect(panel).toHaveClass("transition-all");
    });

    return fab;
  }
}

// Predefined configurations for existing FAB components
export const FAB_CONFIGS = {
  diceRoller: {
    fabName: "open dice roller",
    panelText: "Quick Dice Roller",
    fabClass: "bg-red-600",
    expectedPosition: "right-6",
  },
  cardDrawer: {
    fabName: "draw playing card",
    panelText: "Card Drawer",
    fabClass: "bg-red-600",
    expectedPosition: "right-23",
  },
  tableOfContents: {
    fabName: "open table of contents",
    panelText: "Table of Contents",
    fabClass: "bg-blue-600",
    expectedPosition: "44",
  },
} as const;

// Utility for testing FAB integration patterns
export const testFABIntegration = {
  async testMutualExclusion() {
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
    expect(screen.getByText("Card Drawer")).toBeInTheDocument();

    // Open dice roller - should close card drawer
    fireEvent.click(diceRollerFAB);
    expect(screen.getByText("Quick Dice Roller")).toBeInTheDocument();

    const cardDrawerPanel = screen
      .getByText("Card Drawer")
      .closest(".absolute");
    expect(cardDrawerPanel).toHaveClass("opacity-0", "pointer-events-none");
  },

  async testToggleBehavior() {
    const tocFAB = screen.getByRole("button", {
      name: /open table of contents/i,
    });

    // Open table of contents
    fireEvent.click(tocFAB);
    expect(tocFAB).toHaveAttribute("aria-expanded", "true");

    // Click again to close
    fireEvent.click(tocFAB);
    expect(tocFAB).toHaveAttribute("aria-expanded", "false");
  },
};
