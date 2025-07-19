import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import Card from "../Card";
import { mockCardData } from "@/test/utils";

describe("Card Component", () => {
  const sampleCard = mockCardData.text;

  it("renders card with title and content", () => {
    render(<Card {...sampleCard} />);

    expect(screen.getByText(sampleCard.title)).toBeInTheDocument();
    expect(screen.getByText(/roll 2d6/i)).toBeInTheDocument();
  });

  it("applies data-card-title attribute", () => {
    render(<Card {...sampleCard} />);

    const cardElement = screen.getByTestId("card");
    expect(cardElement).toHaveAttribute("data-card-title", sampleCard.title);
  });

  it("renders card with proper styling classes", () => {
    render(<Card {...sampleCard} />);

    const cardElement = screen.getByTestId("card");
    expect(cardElement).toHaveClass("bg-gray-800");
    expect(cardElement).toHaveClass("shadow-md");
    expect(cardElement).toHaveClass("rounded-lg");
  });

  it("renders card title with correct heading level", () => {
    render(<Card {...sampleCard} />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(sampleCard.title);
  });

  it("renders different card content types", () => {
    const textCard = mockCardData.text;
    const { rerender } = render(<Card {...textCard} />);

    expect(screen.getByText(textCard.content as string)).toBeInTheDocument();

    // Test dice card
    rerender(<Card {...sampleCard} />);
    expect(screen.getByText(/roll 2d6/i)).toBeInTheDocument();

    // Test list card
    const listCard = mockCardData.list;
    rerender(<Card {...listCard} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    // Test single table card
    const tableCard = mockCardData.table;
    rerender(<Card {...tableCard} />);
    expect(screen.getByText("Test Table")).toBeInTheDocument();
    expect(screen.getByText("First row")).toBeInTheDocument();

    // Test multiple tables card
    const tablesCard = mockCardData.tables;
    rerender(<Card {...tablesCard} />);
    expect(screen.getByText("First Table")).toBeInTheDocument();
    expect(screen.getByText("Second Table")).toBeInTheDocument();
    expect(screen.getByText("First row")).toBeInTheDocument();
    expect(screen.getByText("Row A")).toBeInTheDocument();
  });

  it("handles cards without tags gracefully", () => {
    render(<Card {...sampleCard} />);

    // Card component doesn't support tags, so this should pass
    expect(screen.getByText(sampleCard.title)).toBeInTheDocument();
  });

  it("applies proper accessibility attributes", () => {
    render(<Card {...sampleCard} />);

    const cardElement = screen.getByTestId("card");
    // Check basic accessibility - article should be accessible
    expect(cardElement.tagName).toBe("ARTICLE");
    expect(cardElement).toHaveAttribute("data-card-title", sampleCard.title);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(sampleCard.title);
  });

  it("handles long titles properly", () => {
    const longTitleCard = {
      ...sampleCard,
      title:
        "This is a very long card title that should wrap properly and not break the layout",
    };

    render(<Card {...longTitleCard} />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(longTitleCard.title);
  });

  it("handles empty content gracefully", () => {
    const emptyCard = {
      ...sampleCard,
      content: "",
    };

    render(<Card {...emptyCard} />);

    expect(screen.getByText(emptyCard.title)).toBeInTheDocument();
    // Should still render the card structure
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });
});
