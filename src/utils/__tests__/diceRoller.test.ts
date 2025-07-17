import { describe, it, expect, vi, beforeEach } from "vitest";
import { DiceRoll, SimpleDiceRoll, roll } from "@/utils/diceRoller";

describe("SimpleDiceRoll", () => {
  beforeEach(() => {
    // Mock Math.random for predictable tests
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  describe("Basic dice rolling", () => {
    it("should roll a single d6", () => {
      const diceRoll = new SimpleDiceRoll("1d6");
      expect(diceRoll.total).toBe(4); // 0.5 * 6 + 1 = 4
      expect(diceRoll.rolls).toEqual([4]);
      expect(diceRoll.notation).toBe("1d6");
      expect(diceRoll.output).toBe("4");
    });

    it("should roll multiple dice", () => {
      const diceRoll = new SimpleDiceRoll("3d6");
      expect(diceRoll.total).toBe(12); // 4 + 4 + 4
      expect(diceRoll.rolls).toEqual([4, 4, 4]);
      expect(diceRoll.output).toBe("[4, 4, 4] = 12");
    });

    it("should handle modifiers", () => {
      const diceRoll = new SimpleDiceRoll("1d20+5");
      expect(diceRoll.total).toBe(16); // 11 + 5
      expect(diceRoll.output).toBe("[11]+5 = 16");
    });

    it("should handle negative modifiers", () => {
      const diceRoll = new SimpleDiceRoll("1d8-2");
      expect(diceRoll.total).toBe(3); // 5 - 2
      expect(diceRoll.output).toBe("[5]-2 = 3");
    });
  });

  describe("Advanced dice mechanics", () => {
    it("should handle advantage (keep highest)", () => {
      vi.spyOn(Math, "random")
        .mockReturnValueOnce(0.1) // Roll 1 -> (0.1 * 20) + 1 = 3
        .mockReturnValueOnce(0.85); // Roll 18 -> (0.85 * 20) + 1 = 18

      const diceRoll = new SimpleDiceRoll("2d20kh1");
      expect(diceRoll.total).toBe(18);
      expect(diceRoll.rolls).toEqual([18]);
      expect(diceRoll.output).toBe("[3, 18] keep highest 1: [18] = 18");
    });

    it("should handle disadvantage (keep lowest)", () => {
      vi.spyOn(Math, "random")
        .mockReturnValueOnce(0.1) // Roll 1 -> (0.1 * 20) + 1 = 3
        .mockReturnValueOnce(0.85); // Roll 18 -> (0.85 * 20) + 1 = 18

      const diceRoll = new SimpleDiceRoll("2d20kl1");
      expect(diceRoll.total).toBe(3);
      expect(diceRoll.rolls).toEqual([3]);
      expect(diceRoll.output).toBe("[3, 18] keep lowest 1: [3] = 3");
    });

    it("should handle multiple keep highest", () => {
      const diceRoll = new SimpleDiceRoll("4d6kh3");
      expect(diceRoll.total).toBe(12); // Keep 3 highest of [4,4,4,4]
      expect(diceRoll.rolls).toEqual([4, 4, 4]);
    });
  });

  describe("Special dice types", () => {
    it("should handle percentile dice (d100)", () => {
      const diceRoll = new SimpleDiceRoll("d100");
      expect(diceRoll.total).toBe(51); // 0.5 * 100 + 1
    });

    it("should handle coin flip (d2)", () => {
      const diceRoll = new SimpleDiceRoll("1d2");
      expect(diceRoll.total).toBe(2); // 0.5 * 2 + 1
    });
  });

  describe("Edge cases and validation", () => {
    it("should handle invalid notation gracefully", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const diceRoll = new SimpleDiceRoll("invalid");

      expect(diceRoll.total).toBe(0);
      expect(diceRoll.rolls).toEqual([]);
      expect(diceRoll.output).toBe("Invalid notation");
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("should validate dice parameters", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const diceRoll = new SimpleDiceRoll("1000d1000");

      expect(diceRoll.total).toBe(0);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("should handle whitespace in notation", () => {
      const diceRoll = new SimpleDiceRoll(" 1 d 6 + 2 ");
      expect(diceRoll.total).toBe(6); // 4 + 2
    });
  });
});

describe("DiceRoll wrapper class", () => {
  it("should provide the same interface as SimpleDiceRoll", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const diceRoll = new DiceRoll("1d20");
    expect(diceRoll.total).toBe(11);
    expect(diceRoll.notation).toBe("1d20");
    expect(diceRoll.output).toBe("11");
  });
});

describe("roll() convenience function", () => {
  it("should return a complete result object", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const result = roll("2d6+3");
    expect(result).toEqual({
      total: 11, // 4 + 4 + 3
      rolls: [4, 4],
      notation: "2d6+3",
      breakdown: "[4, 4]+3 = 11",
    });
  });
});
