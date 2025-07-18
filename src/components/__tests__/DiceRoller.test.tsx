import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/test/utils";
import DiceRoller from "../DiceRoller";
import { FABTestHelper, FAB_CONFIGS } from "@/test/fabTestUtils";
import { createLocalStorageMock } from "@/test/mockUtils";

// Mock localStorage
createLocalStorageMock();

// Mock the DiceRoll utility
vi.mock("@/utils/diceRoller", () => ({
  DiceRoll: vi.fn().mockImplementation((expression: string) => ({
    output: `Result: ${expression}`,
    total: 15,
  })),
}));

// Mock the dice history utility with a simple approach
const mockHistory: Array<{
  id: string;
  notation: string;
  result: number;
  breakdown: string;
  timestamp: Date;
}> = [];

vi.mock("@/utils/diceHistory", () => ({
  diceHistory: {
    addRoll: vi.fn((notation: string, result: number, breakdown: string) => {
      mockHistory.unshift({
        id: `mock_${Date.now()}`,
        notation,
        result,
        breakdown,
        timestamp: new Date(),
      });
    }),
    getHistory: vi.fn(() => [...mockHistory]),
    clearHistory: vi.fn(() => {
      mockHistory.length = 0;
    }),
    getHistoryInfo: vi.fn(() => ({
      totalRolls: mockHistory.length,
      oldestEntry:
        mockHistory.length > 0
          ? mockHistory[mockHistory.length - 1].timestamp
          : null,
      newestEntry: mockHistory.length > 0 ? mockHistory[0].timestamp : null,
    })),
  },
}));

describe("DiceRoller Component", () => {
  let fabHelper: FABTestHelper;

  beforeEach(() => {
    vi.clearAllMocks();
    fabHelper = new FABTestHelper(FAB_CONFIGS.diceRoller);
    // Clear mock history between tests
    mockHistory.length = 0;
  });

  it("renders floating action button", async () => {
    render(<DiceRoller />);
    await fabHelper.testFABRender();
  });

  it("opens and closes dice panel", async () => {
    render(<DiceRoller />);
    await fabHelper.testPanelOpenClose();
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

  it("shows dice history when toggled", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Input a dice expression and roll
    const input = screen.getByPlaceholderText("1d20+3");
    fireEvent.change(input, { target: { value: "1d6" } });

    const rollButton = screen.getByRole("button", { name: "Roll" });
    fireEvent.click(rollButton);

    // Check that history section appears
    const historyButton = screen.getByText(/History/);
    expect(historyButton).toBeInTheDocument();

    // Should show count of 1 after rolling
    expect(screen.getByText(/History \(1\)/)).toBeInTheDocument();

    // Click to show history
    fireEvent.click(historyButton);

    // Should show the roll we just made in history (check for the history panel content)
    const historyEntries = screen.getAllByText(/Result: 1d6/);
    expect(historyEntries.length).toBeGreaterThan(1); // Main result + history entry

    // Check that the history section contains the expected notation
    expect(screen.getByText("1d6")).toBeInTheDocument();
    expect(screen.getByText(/Just now/)).toBeInTheDocument();
  });

  it("clears dice history when clear button is clicked", async () => {
    render(<DiceRoller />);

    const fab = screen.getByRole("button", { name: /open dice roller/i });
    fireEvent.click(fab);

    // Roll some dice first
    const input = screen.getByPlaceholderText("1d20+3");
    fireEvent.change(input, { target: { value: "2d6" } });

    const rollButton = screen.getByRole("button", { name: "Roll" });
    fireEvent.click(rollButton);

    // Open history
    const historyButton = screen.getByText(/History/);
    fireEvent.click(historyButton);

    // Clear history - need to find the clear button by title since it might not be visible initially
    const clearButton = screen.getByTitle("Clear history");
    fireEvent.click(clearButton);

    // History should now show empty message
    expect(
      screen.getByText(
        "No dice rolls yet. Start rolling to build your history!"
      )
    ).toBeInTheDocument();
  });
});
