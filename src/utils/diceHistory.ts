// Dice roll history utility with localStorage persistence
// Stores the last 20 dice rolls with timestamps

export interface DiceHistoryEntry {
  id: string;
  notation: string;
  result: number;
  breakdown: string;
  timestamp: Date;
}

export interface DiceHistoryState {
  entries: DiceHistoryEntry[];
  maxEntries: number;
}

class DiceHistory {
  private static instance: DiceHistory;
  private state: DiceHistoryState;
  private readonly STORAGE_KEY = "rollalone-dice-history";
  private readonly MAX_ENTRIES = 20;

  private constructor() {
    this.state = this.loadState() || {
      entries: [],
      maxEntries: this.MAX_ENTRIES,
    };
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

    // Add to the beginning of the array (most recent first)
    this.state.entries.unshift(entry);

    // Keep only the most recent MAX_ENTRIES
    if (this.state.entries.length > this.MAX_ENTRIES) {
      this.state.entries = this.state.entries.slice(0, this.MAX_ENTRIES);
    }

    this.saveState();
  }

  public getHistory(): DiceHistoryEntry[] {
    return [...this.state.entries];
  }

  public clearHistory(): void {
    this.state.entries = [];
    this.saveState();
  }

  public getHistoryInfo(): {
    totalRolls: number;
    oldestEntry: Date | null;
    newestEntry: Date | null;
  } {
    const entries = this.state.entries;
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

  private saveState(): void {
    try {
      // Convert dates to ISO strings for JSON serialization
      const serializedState = {
        ...this.state,
        entries: this.state.entries.map((entry) => ({
          ...entry,
          timestamp: entry.timestamp.toISOString(),
        })),
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(serializedState));
    } catch (error) {
      console.warn("Failed to save dice history to localStorage:", error);
    }
  }

  private loadState(): DiceHistoryState | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const parsed = JSON.parse(stored);

      // Convert ISO strings back to Date objects
      const entries = parsed.entries.map(
        (entry: {
          id: string;
          notation: string;
          result: number;
          breakdown: string;
          timestamp: string;
        }) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        })
      );

      return {
        entries,
        maxEntries: parsed.maxEntries || this.MAX_ENTRIES,
      };
    } catch (error) {
      console.warn("Failed to load dice history from localStorage:", error);
      return null;
    }
  }
}

// Export the singleton instance
export const diceHistory = DiceHistory.getInstance();
