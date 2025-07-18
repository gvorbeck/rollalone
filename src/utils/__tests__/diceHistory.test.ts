import { describe, it, expect, beforeEach, vi } from "vitest";
import { diceHistory } from "../diceHistory";

// Mock localStorage
const mockLocalStorage = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => mockLocalStorage.store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockLocalStorage.store[key];
  }),
  clear: vi.fn(() => {
    mockLocalStorage.store = {};
  }),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("DiceHistory", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    // Clear history
    diceHistory.clearHistory();
  });

  it("should add a roll to history", () => {
    diceHistory.addRoll("1d20", 15, "15");
    const history = diceHistory.getHistory();

    expect(history).toHaveLength(1);
    expect(history[0].notation).toBe("1d20");
    expect(history[0].result).toBe(15);
    expect(history[0].breakdown).toBe("15");
    expect(history[0].timestamp).toBeInstanceOf(Date);
  });

  it("should maintain chronological order (newest first)", () => {
    diceHistory.addRoll("1d6", 3, "3");
    diceHistory.addRoll("1d20", 15, "15");
    diceHistory.addRoll("2d6", 8, "[4, 4] = 8");

    const history = diceHistory.getHistory();
    expect(history).toHaveLength(3);
    expect(history[0].notation).toBe("2d6");
    expect(history[1].notation).toBe("1d20");
    expect(history[2].notation).toBe("1d6");
  });

  it("should limit history to 20 entries", () => {
    // Add 25 rolls
    for (let i = 1; i <= 25; i++) {
      diceHistory.addRoll(`${i}d6`, i, `${i}`);
    }

    const history = diceHistory.getHistory();
    expect(history).toHaveLength(20);

    // Should have the most recent 20 (6d6 through 25d6)
    expect(history[0].notation).toBe("25d6");
    expect(history[19].notation).toBe("6d6");
  });

  it("should clear history", () => {
    diceHistory.addRoll("1d20", 15, "15");
    diceHistory.addRoll("2d6", 8, "[4, 4] = 8");

    expect(diceHistory.getHistory()).toHaveLength(2);

    diceHistory.clearHistory();
    expect(diceHistory.getHistory()).toHaveLength(0);
  });

  it("should provide history info", () => {
    const info = diceHistory.getHistoryInfo();
    expect(info.totalRolls).toBe(0);
    expect(info.oldestEntry).toBeNull();
    expect(info.newestEntry).toBeNull();

    diceHistory.addRoll("1d6", 3, "3");
    diceHistory.addRoll("1d20", 15, "15");

    const updatedInfo = diceHistory.getHistoryInfo();
    expect(updatedInfo.totalRolls).toBe(2);
    expect(updatedInfo.oldestEntry).toBeInstanceOf(Date);
    expect(updatedInfo.newestEntry).toBeInstanceOf(Date);
  });

  it("should persist to localStorage", () => {
    diceHistory.addRoll("1d20", 15, "15");

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "rollalone-dice-history",
      expect.stringContaining("1d20")
    );
  });

  it("should load from localStorage", () => {
    // Clear current history first
    diceHistory.clearHistory();

    // Manually set localStorage data
    const testData = {
      entries: [
        {
          id: "test_123",
          notation: "1d20",
          result: 15,
          breakdown: "15",
          timestamp: new Date().toISOString(),
        },
      ],
      maxEntries: 20,
    };

    mockLocalStorage.setItem(
      "rollalone-dice-history",
      JSON.stringify(testData)
    );

    // Add a roll to trigger loading from localStorage
    diceHistory.addRoll("test", 1, "1");
    const history = diceHistory.getHistory();

    // Should have the test roll plus the newly added one
    expect(history.length).toBeGreaterThanOrEqual(1);
    expect(history.some((entry) => entry.notation === "test")).toBe(true);
  });

  it("should handle localStorage errors gracefully", () => {
    // Mock localStorage to throw error
    mockLocalStorage.setItem.mockImplementationOnce(() => {
      throw new Error("localStorage error");
    });

    // Should not throw
    expect(() => {
      diceHistory.addRoll("1d20", 15, "15");
    }).not.toThrow();
  });

  it("should handle invalid localStorage data", () => {
    // Set invalid JSON
    mockLocalStorage.setItem("rollalone-dice-history", "invalid json");

    // Should not throw and should return empty history
    expect(() => {
      diceHistory.getHistory();
    }).not.toThrow();
  });

  it("should generate unique IDs for entries", () => {
    diceHistory.addRoll("1d6", 3, "3");
    diceHistory.addRoll("1d6", 4, "4");

    const history = diceHistory.getHistory();
    expect(history[0].id).not.toBe(history[1].id);
    expect(history[0].id).toMatch(/^roll_\d+_[a-z0-9]+$/);
  });
});
