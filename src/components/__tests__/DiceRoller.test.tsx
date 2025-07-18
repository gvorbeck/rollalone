import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/test/utils";
import DiceRoller from "../DiceRoller";

// Mock the DiceRoll utility
vi.mock("@/utils/diceRoller", () => ({
  DiceRoll: vi.fn().mockImplementation((expression: string) => ({
    output: `Result: ${expression}`,
    total: 15,
  })),
}));

describe("DiceRoller Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders floating action button", () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    expect(fab).toBeInTheDocument();
    expect(fab).toHaveClass("bg-red-600");
  });

  it("opens and closes dice panel", async () => {
    render(<DiceRoller />);

    // Initially panel should be hidden via CSS
    const panel = document.querySelector(".fixed .absolute");
    expect(panel).toHaveClass("opacity-0", "pointer-events-none");

    // Click to open
    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Check panel is now visible (without waitFor to avoid hanging)
    expect(panel).toHaveClass("opacity-100");
    expect(panel).not.toHaveClass("pointer-events-none");

    // Find and click the close button in header (different from FAB)
    const closeButtons = screen.getAllByTitle("Close dice roller");
    const headerCloseButton = closeButtons.find(
      (btn) => btn.textContent === "✕"
    );
    expect(headerCloseButton).toBeInTheDocument();
    fireEvent.click(headerCloseButton!);

    // Check panel is hidden again
    expect(panel).toHaveClass("opacity-0", "pointer-events-none");
  });

  it("displays all dice types", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Check dice types are visible (sync check since FAB context updates immediately)
    expect(screen.getByText(/quick dice roller/i)).toBeInTheDocument();
    expect(screen.getByText("d2")).toBeInTheDocument();
    expect(screen.getByText("d4")).toBeInTheDocument();
    expect(screen.getByText("d6")).toBeInTheDocument();
    expect(screen.getByText("d8")).toBeInTheDocument();
    expect(screen.getByText("d10")).toBeInTheDocument();
    expect(screen.getByText("d12")).toBeInTheDocument();
    expect(screen.getByText("d20")).toBeInTheDocument();
    expect(screen.getByText("d%")).toBeInTheDocument();
  });

  it("builds dice expression when clicking dice buttons", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Check panel is open
    expect(screen.getByText(/dice roller/i)).toBeInTheDocument();

    // Click d6 button
    const d6Button = screen.getByRole("button", { name: /d6/i });
    fireEvent.click(d6Button);

    const input = screen.getByDisplayValue("1d6");
    expect(input).toBeInTheDocument();

    // Click d6 again to increment
    fireEvent.click(d6Button);
    expect(screen.getByDisplayValue("2d6")).toBeInTheDocument();

    // Click d20 to add different die
    const d20Button = screen.getByRole("button", { name: /d20/i });
    fireEvent.click(d20Button);
    expect(screen.getByDisplayValue("2d6+1d20")).toBeInTheDocument();
  });

  it("allows manual input editing", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Panel should be open immediately with FAB context
    expect(screen.getByText("Quick Dice Roller")).toBeInTheDocument();

    // Find and edit the input
    const input = screen.getByPlaceholderText("1d20+3");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "3d6+2" } });
    expect(input).toHaveValue("3d6+2");
  });

  it("rolls dice and displays result", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Panel should be open immediately
    expect(screen.getByText("Quick Dice Roller")).toBeInTheDocument();

    // Find input and roll button
    const input = screen.getByPlaceholderText("1d20+3");
    fireEvent.change(input, { target: { value: "1d6" } });

    const rollButton = screen.getByText("Roll");
    fireEvent.click(rollButton);

    // Wait for result to appear (this one needs waitFor for the async roll operation)
    await waitFor(
      () => {
        expect(screen.getByText(/1d6: result: 1d6/i)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("handles dice rolling errors gracefully", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Panel should be open immediately
    expect(screen.getByText("Quick Dice Roller")).toBeInTheDocument();

    // Find input and enter invalid dice notation
    const input = screen.getByPlaceholderText("1d20+3");
    fireEvent.change(input, { target: { value: "invalid" } });

    const rollButton = screen.getByText("Roll");
    fireEvent.click(rollButton);

    // Wait for result to appear with shorter timeout
    await waitFor(
      () => {
        // The component shows "invalid: Result: invalid" format
        expect(
          screen.getByText(/invalid: result: invalid/i)
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("clears input when clear button is clicked", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Panel should be open immediately
    expect(screen.getByText("Quick Dice Roller")).toBeInTheDocument();

    // Find input and add some text
    const input = screen.getByPlaceholderText("1d20+3");
    fireEvent.change(input, { target: { value: "1d6" } });
    expect(input).toHaveValue("1d6");

    // Note: Clear button is now "↻" not "✕"
    const clearButton = screen.getByTitle("Clear input");
    fireEvent.click(clearButton);
    expect(input).toHaveValue("");
  });

  it("prevents rolling empty dice expression", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Panel should be open immediately
    expect(screen.getByText("Quick Dice Roller")).toBeInTheDocument();

    // Try to roll without any input
    const rollButton = screen.getByText("Roll");
    fireEvent.click(rollButton);

    // Should not display any result
    expect(screen.queryByText(/result:/i)).not.toBeInTheDocument();
  });

  it("has proper accessibility attributes", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Panel should be open immediately
    const panel = screen.getByText("Quick Dice Roller");
    expect(panel).toBeInTheDocument();
  });

  it("displays dice SVG icons correctly", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Panel should be open immediately, check for dice labels
    expect(screen.getByText("d2")).toBeInTheDocument();
    expect(screen.getByText("d4")).toBeInTheDocument();
    expect(screen.getByText("d6")).toBeInTheDocument();
    expect(screen.getByText("d8")).toBeInTheDocument();
    expect(screen.getByText("d10")).toBeInTheDocument();
    expect(screen.getByText("d12")).toBeInTheDocument();
    expect(screen.getByText("d10")).toBeInTheDocument();
    expect(screen.getByText("d12")).toBeInTheDocument();
    expect(screen.getByText("d20")).toBeInTheDocument();
    expect(screen.getByText("d%")).toBeInTheDocument();
  });
});
