import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import CardContentText from "../CardContentText";

describe("CardContentText Component", () => {
  it("renders text content", () => {
    render(<CardContentText content="This is a test." />);
    expect(screen.getByText("This is a test.")).toBeInTheDocument();
  });
});
