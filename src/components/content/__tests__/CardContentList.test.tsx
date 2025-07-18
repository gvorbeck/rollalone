import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import CardContentList from "../CardContentList";

describe("CardContentList Component", () => {
  it("renders numbered list with proper styling", () => {
    const content = ["First item", "Second item", "Third item"];
    render(<CardContentList content={content} />);
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });
});
