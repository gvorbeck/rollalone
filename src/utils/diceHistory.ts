// Dice roll history utility with localStorage persistence
// Stores the last 20 dice rolls with timestamps

import { StorageManager, dateTransforms } from "./storage";

export interface DiceHistoryEntry {
  id: string;
  notation: string;
  result: number;
  breakdown: string;
  timestamp: Date;
}

class DiceHistory {
  private static instance: DiceHistory;
  private storage: StorageManager;
  private readonly MAX_ENTRIES = 20;

  private constructor() {
    this.storage = new StorageManager({
      key: "rollalone-dice-history",
      version: "1.0",
    });
  }

  public static getInstance(): DiceHistory {
    if (!DiceHistory.instance) {
      DiceHistory.instance = new DiceHistory();
    }
    return DiceHistory.instance;
  }

  public addRoll(notation: string, result: number, breakdown: string): void {
    const entry: DiceHistoryEntry = {
      id: this.generateId(),
      notation: notation,
      result: result,
      breakdown: breakdown,
      timestamp: new Date(),
    };

    // Load current entries, add new one, and trim to max
    const currentEntries = this.getHistory();
    const updatedEntries = [entry, ...currentEntries].slice(
      0,
      this.MAX_ENTRIES
    );

    // Save with date transformation
    this.storage.save(updatedEntries, dateTransforms.serialize);
  }

  public getHistory(): DiceHistoryEntry[] {
    return (
      this.storage.load<DiceHistoryEntry[]>(
        (data: unknown) =>
          Array.isArray(data)
            ? data.map((entry) => ({
                ...entry,
                timestamp:
                  typeof entry.timestamp === "string"
                    ? new Date(entry.timestamp)
                    : entry.timestamp,
              }))
            : [],
        []
      ) || []
    );
  }

  public clearHistory(): void {
    this.storage.save<DiceHistoryEntry[]>([]);
  }

  public getHistoryInfo(): {
    totalRolls: number;
    oldestEntry: Date | null;
    newestEntry: Date | null;
  } {
    const entries = this.getHistory();
    return {
      totalRolls: entries.length,
      oldestEntry:
        entries.length > 0 ? entries[entries.length - 1].timestamp : null,
      newestEntry: entries.length > 0 ? entries[0].timestamp : null,
    };
  }

  private generateId(): string {
    return `roll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export the singleton instance
export const diceHistory = DiceHistory.getInstance();
