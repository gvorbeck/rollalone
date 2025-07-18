import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { scrollToCard } from "@/utils/scrollToCard";
import { createMockCard, cleanupDOM } from "@/test/utils";

describe("scrollToCard", () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();

    // Mock console.warn
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanupDOM();
    vi.restoreAllMocks();
  });

  describe("Internal link mappings", () => {
    it('should scroll to Plot Hook Generator when given "PLOT HOOK"', () => {
      const element = createMockCard("Plot Hook Generator");

      scrollToCard("PLOT HOOK");

      expect(element.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });

    it('should scroll to Random Events when given "RANDOM EVENT"', () => {
      const element = createMockCard("Random Events & Complex Questions");

      scrollToCard("RANDOM EVENT");

      expect(element.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });

    it("should handle all mapped links", () => {
      const mappings = {
        "PLOT HOOK": "Plot Hook Generator",
        "RANDOM EVENT": "Random Events & Complex Questions",
        "SET THE SCENE": "Set the Scene",
        "GM MOVES": "GM Moves",
        "ORACLE (FOCUS)": "Oracle (Focus)",
        "ORACLE (HOW)": "Oracle (How)",
        "ORACLE (YES/NO)": "Oracle (Yes/No)",
        "ORACLE": "Oracle (Yes/No)",
        "ACTION FOCUS": "Oracle (Focus)",
        "DETAIL FOCUS": "Oracle (Focus)",
        "TOPIC FOCUS": "Oracle (Focus)",
      };

      Object.entries(mappings).forEach(([linkText, cardTitle]) => {
        cleanupDOM();
        const element = createMockCard(cardTitle);

        scrollToCard(linkText);

        expect(element.scrollIntoView).toHaveBeenCalledWith({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  });

  describe("Direct card title navigation", () => {
    it("should scroll to card by exact title match", () => {
      const element = createMockCard("How to Play");

      scrollToCard("How to Play");

      expect(element.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });

    it("should handle complex card titles", () => {
      const element = createMockCard("Oracle (Yes/No)");

      scrollToCard("Oracle (Yes/No)");

      expect(element.scrollIntoView).toHaveBeenCalled();
    });

    it("should work with long titles", () => {
      const element = createMockCard("Random Events & Complex Questions");

      scrollToCard("Random Events & Complex Questions");

      expect(element.scrollIntoView).toHaveBeenCalled();
    });
  });

  describe("Error handling", () => {
    it("should warn when card is not found", () => {
      const consoleSpy = vi.spyOn(console, "warn");

      scrollToCard("Nonexistent Card");

      expect(consoleSpy).toHaveBeenCalledWith(
        'Could not find card with title "Nonexistent Card"'
      );
    });

    it("should not throw errors for invalid input", () => {
      expect(() => {
        scrollToCard("");
        scrollToCard("   ");
        scrollToCard("Random String That Does Not Exist");
      }).not.toThrow();
    });
  });

  describe("Highlight animation", () => {
    beforeEach(() => {
      // Mock setTimeout for highlight animation
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should add and remove highlight class", () => {
      const element = createMockCard("Test Card");

      scrollToCard("Test Card");

      // Should add highlight class
      expect(element.classList.contains("card-highlight")).toBe(true);

      // Should remove highlight class after timeout
      vi.advanceTimersByTime(1500);
      expect(element.classList.contains("card-highlight")).toBe(false);
    });

    it("should handle multiple rapid calls", () => {
      const element = createMockCard("Test Card");

      // Call multiple times rapidly
      scrollToCard("Test Card");
      scrollToCard("Test Card");
      scrollToCard("Test Card");

      // Should still work correctly
      expect(element.classList.contains("card-highlight")).toBe(true);
    });
  });

  describe("Multiple cards with same title", () => {
    it("should scroll to the first matching card", () => {
      // Clean up DOM before test
      cleanupDOM();
      // Create two elements with the same title
      const element1 = createMockCard("Duplicate Title");
      const element2 = createMockCard("Duplicate Title");
      // Mock scrollIntoView on both
      element1.scrollIntoView = vi.fn();
      element2.scrollIntoView = vi.fn();

      scrollToCard("Duplicate Title");

      // Should scroll to first matching element only
      expect(element1.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
      expect(element2.scrollIntoView).not.toHaveBeenCalled();
    });
  });
});
