// Lightweight dice roller utility - replaces @dice-roller/rpg-dice-roller
// Supports common dice notation: 1d20, 3d6+2, 2d20kh1, etc.

interface DiceRollResult {
  total: number;
  rolls: number[];
  notation: string;
  breakdown: string;
}

/**
 * Rolls dice based on standard RPG notation
 * Supports: XdY, XdY+Z, XdY-Z, XdYkhZ (keep highest), XdYklZ (keep lowest)
 */
export class SimpleDiceRoll {
  private _total: number = 0;
  private _rolls: number[] = [];
  private _notation: string = "";
  private _breakdown: string = "";

  constructor(notation: string) {
    this._notation = notation.toLowerCase().replace(/\s/g, "");
    this.parseAndRoll();
  }

  get total(): number {
    return this._total;
  }

  get rolls(): number[] {
    return [...this._rolls];
  }

  get notation(): string {
    return this._notation;
  }

  get output(): string {
    return this._breakdown;
  }

  private parseAndRoll(): void {
    try {
      // Check if this is a complex expression with multiple dice groups
      // Pattern: XdY+XdY, XdY-XdY, XdY+Z+XdY, etc.
      if (this.hasMultipleDiceGroups(this._notation)) {
        this.parseComplexExpression();
        return;
      }

      // Handle basic dice notation: XdY, XdY+Z, XdY-Z
      const basicPattern = /^(\d+)?d(\d+)([+-]\d+)?$/;
      const basicMatch = this._notation.match(basicPattern);

      if (basicMatch) {
        const count = parseInt(basicMatch[1] || "1");
        const sides = parseInt(basicMatch[2]);
        const modifier = basicMatch[3] ? parseInt(basicMatch[3]) : 0;

        this.rollBasicDice(count, sides, modifier);
        return;
      }

      // Handle keep highest/lowest: XdYkhZ, XdYklZ
      const keepPattern = /^(\d+)?d(\d+)k([hl])(\d+)$/;
      const keepMatch = this._notation.match(keepPattern);

      if (keepMatch) {
        const count = parseInt(keepMatch[1] || "1");
        const sides = parseInt(keepMatch[2]);
        const keepType = keepMatch[3]; // 'h' or 'l'
        const keepCount = parseInt(keepMatch[4]);

        this.rollKeepDice(count, sides, keepType, keepCount);
        return;
      }

      // Handle percentage dice
      if (this._notation === "d100" || this._notation === "1d100") {
        this.rollBasicDice(1, 100, 0);
        return;
      }

      throw new Error(`Unsupported dice notation: ${this._notation}`);
    } catch (error) {
      console.error("Dice parsing error:", error);
      this._total = 0;
      this._rolls = [];
      this._breakdown = "Invalid notation";
    }
  }

  private hasMultipleDiceGroups(notation: string): boolean {
    // Check if notation contains multiple 'd' characters with numbers, indicating multiple dice groups
    const diceGroupPattern = /\d*d\d+/g;
    const matches = notation.match(diceGroupPattern);
    return matches !== null && matches.length > 1;
  }

  private parseComplexExpression(): void {
    // Split the expression into parts (dice groups and modifiers)
    // Handle expressions like: 2d6+1d4, 1d20+3d6-2, etc.
    const parts = this._notation.split(/([+-])/);
    let runningTotal = 0;
    let allRolls: number[] = [];
    let breakdownParts: string[] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim();
      if (!part) continue;

      if (part === "+" || part === "-") {
        continue; // Skip operators, we'll handle them in context
      }

      // Determine if this part should be added or subtracted
      const isNegative = i > 0 && parts[i - 1] === "-";

      if (part.includes("d")) {
        // This is a dice group
        const diceResult = this.rollSingleDiceGroup(part);
        const contribution = isNegative ? -diceResult.total : diceResult.total;
        runningTotal += contribution;
        allRolls.push(...diceResult.rolls);

        const prefix = i === 0 ? "" : isNegative ? "-" : "+";
        breakdownParts.push(`${prefix}${diceResult.breakdown}`);
      } else if (/^\d+$/.test(part)) {
        // This is a numeric modifier
        const modifier = parseInt(part);
        const contribution = isNegative ? -modifier : modifier;
        runningTotal += contribution;

        const prefix = i === 0 ? "" : isNegative ? "-" : "+";
        breakdownParts.push(`${prefix}${modifier}`);
      }
    }

    this._total = runningTotal;
    this._rolls = allRolls;
    this._breakdown = `${breakdownParts.join("")} = ${runningTotal}`;
  }

  private rollSingleDiceGroup(notation: string): {
    total: number;
    rolls: number[];
    breakdown: string;
  } {
    // Parse a single dice group like "2d6" or "1d4"
    const pattern = /^(\d+)?d(\d+)$/;
    const match = notation.match(pattern);

    if (!match) {
      throw new Error(`Invalid dice group: ${notation}`);
    }

    const count = parseInt(match[1] || "1");
    const sides = parseInt(match[2]);

    if (count <= 0 || count > 100 || sides <= 0 || sides > 1000) {
      throw new Error("Invalid dice parameters");
    }

    const rolls = [];
    for (let i = 0; i < count; i++) {
      rolls.push(this.rollSingle(sides));
    }

    const total = rolls.reduce((sum, roll) => sum + roll, 0);

    let breakdown;
    if (count === 1) {
      breakdown = `${rolls[0]}`;
    } else {
      breakdown = `[${rolls.join(", ")}]`;
    }

    return { total, rolls, breakdown };
  }

  private rollBasicDice(count: number, sides: number, modifier: number): void {
    if (count <= 0 || count > 100 || sides <= 0 || sides > 1000) {
      throw new Error("Invalid dice parameters");
    }

    this._rolls = [];
    for (let i = 0; i < count; i++) {
      this._rolls.push(this.rollSingle(sides));
    }

    const rollSum = this._rolls.reduce((sum, roll) => sum + roll, 0);
    this._total = rollSum + modifier;

    // Create breakdown string
    if (count === 1 && modifier === 0) {
      this._breakdown = `${this._rolls[0]}`;
    } else if (modifier === 0) {
      this._breakdown = `[${this._rolls.join(", ")}] = ${rollSum}`;
    } else {
      const modStr = modifier >= 0 ? `+${modifier}` : `${modifier}`;
      this._breakdown = `[${this._rolls.join(", ")}]${modStr} = ${this._total}`;
    }
  }

  private rollKeepDice(
    count: number,
    sides: number,
    keepType: string,
    keepCount: number
  ): void {
    if (
      count <= 0 ||
      count > 100 ||
      sides <= 0 ||
      sides > 1000 ||
      keepCount <= 0 ||
      keepCount > count
    ) {
      throw new Error("Invalid dice parameters");
    }

    // Roll all dice
    const allRolls = [];
    for (let i = 0; i < count; i++) {
      allRolls.push(this.rollSingle(sides));
    }

    // Sort and keep appropriate dice
    const sortedRolls = [...allRolls].sort((a, b) => b - a); // Descending order
    this._rolls =
      keepType === "h"
        ? sortedRolls.slice(0, keepCount) // Keep highest
        : sortedRolls.slice(-keepCount); // Keep lowest

    this._total = this._rolls.reduce((sum, roll) => sum + roll, 0);

    // Create breakdown string
    const keptStr = keepType === "h" ? "highest" : "lowest";
    this._breakdown = `[${allRolls.join(
      ", "
    )}] keep ${keptStr} ${keepCount}: [${this._rolls.join(", ")}] = ${
      this._total
    }`;
  }

  private rollSingle(sides: number): number {
    return Math.floor(Math.random() * sides) + 1;
  }
}

// Convenience function that matches the original library's interface
export class DiceRoll {
  private _roll: SimpleDiceRoll;

  constructor(notation: string) {
    this._roll = new SimpleDiceRoll(notation);
  }

  get total(): number {
    return this._roll.total;
  }

  get output(): string {
    return this._roll.output;
  }

  get notation(): string {
    return this._roll.notation;
  }
}

// Quick roll function for simple cases
export const roll = (notation: string): DiceRollResult => {
  const diceRoll = new SimpleDiceRoll(notation);
  return {
    total: diceRoll.total,
    rolls: diceRoll.rolls,
    notation: diceRoll.notation,
    breakdown: diceRoll.output,
  };
};
