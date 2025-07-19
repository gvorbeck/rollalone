export interface DiceResult {
  total: number;
  rolls: number[];
  notation: string;
  breakdown: string;
}

export class SimpleDiceRoll {
  public total: number;
  public rolls: number[];
  public notation: string;
  public output: string;

  constructor(notation: string) {
    this.notation = notation.trim();
    const result = this.parse(notation);
    this.total = result.total;
    this.rolls = result.rolls;
    this.output = result.breakdown;
  }

  private parse(notation: string): DiceResult {
    try {
      const cleanNotation = notation.replace(/\s+/g, "");

      // Check if this is truly multiple dice groups or just single dice with modifier
      const dicePattern = /d\d+/gi;
      const diceMatches = cleanNotation.match(dicePattern);

      // If more than one dice group (e.g., "2d6+1d4"), use multiple groups parser
      if (diceMatches && diceMatches.length > 1) {
        return this.parseMultipleGroups(cleanNotation);
      }

      return this.parseSingleGroup(cleanNotation);
    } catch (error) {
      console.error("Error parsing dice notation:", notation, error);
      return { total: 0, rolls: [], notation, breakdown: "Invalid notation" };
    }
  }

  private parseSingleGroup(notation: string): DiceResult {
    // Match patterns like "2d20kh1", "1d6+5", "d100"
    const match = notation.match(/^(\d*)d(\d+)(?:k([hl])(\d+))?([+-]\d+)?$/i);
    if (!match) {
      throw new Error(`Invalid notation: ${notation}`);
    }

    const count = parseInt(match[1] || "1");
    const sides = parseInt(match[2]);
    const keepType = match[3]; // 'h' for highest, 'l' for lowest
    const keepCount = match[4] ? parseInt(match[4]) : null;
    const modifier = match[5] ? parseInt(match[5]) : 0;

    // Validation
    if (count > 100 || sides > 1000) {
      throw new Error("Dice parameters too large");
    }

    // Roll dice
    const allRolls: number[] = [];
    for (let i = 0; i < count; i++) {
      allRolls.push(Math.floor(Math.random() * sides) + 1);
    }

    let finalRolls = allRolls;
    let rollBreakdown = "";

    // Handle keep highest/lowest
    if (keepType && keepCount) {
      const sorted = [...allRolls].sort((a, b) =>
        keepType === "h" ? b - a : a - b
      );
      finalRolls = sorted.slice(0, keepCount);
      rollBreakdown = `[${allRolls.join(", ")}] keep ${
        keepType === "h" ? "highest" : "lowest"
      } ${keepCount}: [${finalRolls.join(", ")}]`;
    }

    const rollTotal = finalRolls.reduce((sum, roll) => sum + roll, 0);
    const total = rollTotal + modifier;

    let breakdown: string;
    if (rollBreakdown) {
      breakdown =
        modifier === 0
          ? `${rollBreakdown} = ${total}`
          : `${rollBreakdown}${modifier >= 0 ? "+" : ""}${modifier} = ${total}`;
    } else if (count === 1) {
      breakdown =
        modifier === 0
          ? `${total}`
          : `[${finalRolls[0]}]${
              modifier >= 0 ? "+" : ""
            }${modifier} = ${total}`;
    } else {
      breakdown =
        modifier === 0
          ? `[${finalRolls.join(", ")}] = ${total}`
          : `[${finalRolls.join(", ")}]${
              modifier >= 0 ? "+" : ""
            }${modifier} = ${total}`;
    }

    return { total, rolls: finalRolls, notation, breakdown };
  }

  private parseMultipleGroups(notation: string): DiceResult {
    // Split on + and - while preserving the operators
    const parts = notation.split(/([+-])/).filter((p) => p);

    let total = 0;
    let allRolls: number[] = [];
    let breakdownParts: string[] = [];
    let currentOp = "+";

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (part === "+" || part === "-") {
        currentOp = part;
        continue;
      }

      if (/^\d+$/.test(part)) {
        // Pure number modifier
        const value = parseInt(part);
        const adjustedValue = currentOp === "+" ? value : -value;
        total += adjustedValue;
        breakdownParts.push(
          currentOp === "+" && i > 0
            ? `+${value}`
            : currentOp === "-"
            ? `-${value}`
            : `${value}`
        );
      } else {
        // Dice notation
        const result = this.parseSingleGroup(part);
        const adjustedTotal = currentOp === "+" ? result.total : -result.total;
        total += adjustedTotal;
        allRolls.push(...result.rolls);

        if (result.rolls.length === 1) {
          breakdownParts.push(
            currentOp === "+" && i > 0
              ? `+${result.rolls[0]}`
              : currentOp === "-"
              ? `-${result.rolls[0]}`
              : `${result.rolls[0]}`
          );
        } else {
          const rollStr = `[${result.rolls.join(", ")}]`;
          breakdownParts.push(
            currentOp === "+" && i > 0
              ? `+${rollStr}`
              : currentOp === "-"
              ? `-${rollStr}`
              : rollStr
          );
        }
      }
    }

    const breakdown = `${breakdownParts.join("")} = ${total}`;
    return { total, rolls: allRolls, notation, breakdown };
  }
}

export class DiceRoll extends SimpleDiceRoll {
  // Wrapper class for compatibility
}

export function roll(notation: string): DiceResult {
  const diceRoll = new SimpleDiceRoll(notation);
  return {
    total: diceRoll.total,
    rolls: diceRoll.rolls,
    notation: diceRoll.notation,
    breakdown: diceRoll.output,
  };
}
