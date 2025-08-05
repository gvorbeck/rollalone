// Simple dice roll history

import { saveToStorage, loadFromStorage } from "./storage";

export interface DiceHistoryEntry {
  id: string;
  notation: string;
  result: number;
  breakdown: string;
  timestamp: Date;
}

const STORAGE_KEY = "rollalone-dice-history";
const MAX_ENTRIES = 20;

let historyCache: DiceHistoryEntry[] | null = null;

const getHistory = (): DiceHistoryEntry[] => {
  if (historyCache === null) {
    const stored = loadFromStorage<DiceHistoryEntry[]>(STORAGE_KEY, []);

    // Simple validation - if not array, reset
    if (!Array.isArray(stored)) {
      historyCache = [];
    } else {
      // Convert timestamp strings back to Date objects
      historyCache = stored.map((entry) => ({
        ...entry,
        timestamp:
          typeof entry.timestamp === "string"
            ? new Date(entry.timestamp)
            : entry.timestamp,
      }));
    }
  }
  return historyCache;
};

const saveHistory = (entries: DiceHistoryEntry[]): void => {
  historyCache = entries;
  // Convert Date objects to strings for storage
  const serialized = entries.map((entry) => ({
    ...entry,
    timestamp: entry.timestamp.toISOString(),
  }));
  saveToStorage(STORAGE_KEY, serialized);
};

const generateId = (): string => {
  return `roll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const diceHistory = {
  addRoll(notation: string, result: number, breakdown: string): void {
    const entry: DiceHistoryEntry = {
      id: generateId(),
      notation,
      result,
      breakdown,
      timestamp: new Date(),
    };

    const current = getHistory();
    const updated = [entry, ...current].slice(0, MAX_ENTRIES);
    saveHistory(updated);
  },

  getHistory(): DiceHistoryEntry[] {
    return getHistory();
  },

  clearHistory(): void {
    saveHistory([]);
  },

  getHistoryInfo(): {
    totalRolls: number;
    oldestEntry: Date | null;
    newestEntry: Date | null;
  } {
    const entries = getHistory();
    return {
      totalRolls: entries.length,
      oldestEntry:
        entries.length > 0 ? entries[entries.length - 1].timestamp : null,
      newestEntry: entries.length > 0 ? entries[0].timestamp : null,
    };
  },
};
