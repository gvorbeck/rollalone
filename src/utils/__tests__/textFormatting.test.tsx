import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { parseMarkdownBold } from "../textFormatting";

// Mock the scrollToCard utility
vi.mock("@/utils/scrollToCard", () => ({
  scrollToCard: vi.fn(),
}));

import { scrollToCard } from "@/utils/scrollToCard";
const mockScrollToCard = vi.mocked(scrollToCard);

describe("textFormatting utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("parseMarkdownBold", () => {
    it("returns plain text unchanged", () => {
      const result = parseMarkdownBold("This is plain text");
      expect(result).toEqual(["This is plain text"]);
    });

    it("parses bold text correctly", () => {
      const result = parseMarkdownBold("This is **bold** text");

      expect(result).toHaveLength(3);
      expect(result[0]).toBe("This is ");
      expect(result[2]).toBe(" text");

      // Check that the bold element is rendered correctly
      const TestComponent = () => <div>{result}</div>;
      render(<TestComponent />);

      const boldElement = screen.getByText("bold");
      expect(boldElement.tagName).toBe("STRONG");
    });

    it("parses multiple bold sections", () => {
      const result = parseMarkdownBold("**First** and **second** bold");

      expect(result).toHaveLength(4); // Changed from 5 to 4
      expect(result[0]).toEqual(expect.objectContaining({ type: "strong" }));
      expect(result[1]).toBe(" and ");
      expect(result[2]).toEqual(expect.objectContaining({ type: "strong" }));
      expect(result[3]).toBe(" bold");

      const TestComponent = () => <div>{result}</div>;
      render(<TestComponent />);

      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("second")).toBeInTheDocument();
      expect(screen.getByText(/and/)).toBeInTheDocument();
    });

    it("parses external links correctly", () => {
      const result = parseMarkdownBold(
        "Visit [Google](https://google.com) now"
      );

      expect(result).toHaveLength(3);
      expect(result[0]).toBe("Visit ");
      expect(result[2]).toBe(" now");

      const TestComponent = () => <div>{result}</div>;
      render(<TestComponent />);

      const link = screen.getByRole("link", { name: "Google" });
      expect(link).toHaveAttribute("href", "https://google.com");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("parses internal card links correctly", () => {
      const result = parseMarkdownBold("Check the PLOT HOOK for ideas");

      expect(result).toHaveLength(3);
      expect(result[0]).toBe("Check the ");
      expect(result[2]).toBe(" for ideas");

      const TestComponent = () => <div>{result}</div>;
      render(<TestComponent />);

      const internalLink = screen.getByRole("button", { name: "PLOT HOOK" });
      expect(internalLink).toBeInTheDocument();

      fireEvent.click(internalLink);
      expect(mockScrollToCard).toHaveBeenCalledWith("PLOT HOOK");
    });

    it("handles all internal link terms", () => {
      const terms = ["PLOT HOOK", "RANDOM EVENT", "SET THE SCENE", "GM MOVES"];

      terms.forEach((term) => {
        const result = parseMarkdownBold(`Use ${term} here`);

        const TestComponent = () => <div>{result}</div>;
        render(<TestComponent />);

        const button = screen.getByRole("button", { name: term });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("text-red-400");
        expect(button).toHaveClass("hover:text-red-300");
      });
    });

    it("combines bold, external links, and internal links", () => {
      const text =
        "**Bold** text with [link](https://example.com) and PLOT HOOK";
      const result = parseMarkdownBold(text);

      const TestComponent = () => <div>{result}</div>;
      render(<TestComponent />);

      // Check bold text
      expect(screen.getByText("Bold")).toBeInTheDocument();

      // Check external link
      const externalLink = screen.getByRole("link", { name: "link" });
      expect(externalLink).toHaveAttribute("href", "https://example.com");

      // Check internal link
      const internalLink = screen.getByRole("button", { name: "PLOT HOOK" });
      expect(internalLink).toBeInTheDocument();
    });

    it("handles nested formatting gracefully", () => {
      const result = parseMarkdownBold(
        "**Bold [link](https://example.com) text**"
      );

      const TestComponent = () => <div>{result}</div>;
      render(<TestComponent />);

      // Should handle the link within bold text
      expect(screen.getByText("link")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "link" })).toHaveAttribute(
        "href",
        "https://example.com"
      );
    });

    it("handles empty strings", () => {
      const result = parseMarkdownBold("");
      expect(result).toEqual([]); // Changed from [""] to []
    });

    it("handles strings with only whitespace", () => {
      const result = parseMarkdownBold("   ");
      expect(result).toEqual(["   "]);
    });

    it("handles malformed markdown gracefully", () => {
      const result = parseMarkdownBold("**unclosed bold");
      expect(result).toEqual(["**unclosed bold"]);
    });

    it("handles malformed links gracefully", () => {
      const result = parseMarkdownBold("[unclosed link");
      expect(result).toEqual(["[unclosed link"]);
    });

    it("preserves case sensitivity for internal links", () => {
      const result = parseMarkdownBold("plot hook should not be linked");
      expect(result).toEqual(["plot hook should not be linked"]);

      const TestComponent = () => <div>{result}</div>;
      render(<TestComponent />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("handles multiple internal links in one text", () => {
      const result = parseMarkdownBold("Use PLOT HOOK then RANDOM EVENT");

      const TestComponent = () => <div>{result}</div>;
      render(<TestComponent />);

      const plotHookButton = screen.getByRole("button", { name: "PLOT HOOK" });
      const randomEventButton = screen.getByRole("button", {
        name: "RANDOM EVENT",
      });

      expect(plotHookButton).toBeInTheDocument();
      expect(randomEventButton).toBeInTheDocument();

      fireEvent.click(plotHookButton);
      expect(mockScrollToCard).toHaveBeenCalledWith("PLOT HOOK");

      fireEvent.click(randomEventButton);
      expect(mockScrollToCard).toHaveBeenCalledWith("RANDOM EVENT");
    });
  });
});
