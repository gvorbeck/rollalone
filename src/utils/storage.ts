// Reusable localStorage utility with error handling
// Eliminates duplicated try/catch patterns across utilities

export interface StorageConfig {
  key: string;
  version?: string;
}

export class StorageManager {
  private key: string;
  private version: string;

  constructor(config: StorageConfig) {
    this.key = config.key;
    this.version = config.version || "1.0";
  }

  /**
   * Save data to localStorage with automatic error handling
   * @param data - Data to save (will be JSON stringified)
   * @param transform - Optional transform function for serialization
   */
  save<T>(data: T, transform?: (data: T) => unknown): boolean {
    try {
      const serializedData = transform ? transform(data) : data;
      const storageData = {
        version: this.version,
        data: serializedData,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(this.key, JSON.stringify(storageData));
      return true;
    } catch {
      console.warn(`Failed to save data to localStorage (${this.key})`);
      return false;
    }
  }

  /**
   * Load data from localStorage with automatic error handling
   * @param transform - Optional transform function for deserialization
   * @param defaultValue - Default value if loading fails
   */
  load<T>(transform?: (data: unknown) => T, defaultValue?: T): T | null {
    try {
      const stored = localStorage.getItem(this.key);
      if (!stored) return defaultValue || null;

      const parsed = JSON.parse(stored);

      // Version check - if versions don't match, return default
      if (parsed.version !== this.version) {
        console.warn(
          `Storage version mismatch for ${this.key}. Expected ${this.version}, got ${parsed.version}`
        );
        return defaultValue || null;
      }

      return transform ? transform(parsed.data) : parsed.data;
    } catch {
      console.warn(`Failed to load data from localStorage (${this.key})`);
      return defaultValue || null;
    }
  }

  /**
   * Clear stored data
   */
  clear(): boolean {
    try {
      localStorage.removeItem(this.key);
      return true;
    } catch {
      console.warn(`Failed to clear localStorage (${this.key})`);
      return false;
    }
  }

  /**
   * Check if data exists in storage
   */
  exists(): boolean {
    try {
      return localStorage.getItem(this.key) !== null;
    } catch {
      return false;
    }
  }

  /**
   * Get storage info (size, timestamp, etc.)
   */
  getInfo(): { exists: boolean; size: number; timestamp?: string } {
    try {
      const stored = localStorage.getItem(this.key);
      if (!stored) return { exists: false, size: 0 };

      const parsed = JSON.parse(stored);
      return {
        exists: true,
        size: stored.length,
        timestamp: parsed.timestamp,
      };
    } catch {
      return { exists: false, size: 0 };
    }
  }
}

// Specialized storage managers for common patterns
export class HistoryStorage<T> extends StorageManager {
  private maxEntries: number;

  constructor(key: string, maxEntries: number = 20) {
    super({ key, version: "1.0" });
    this.maxEntries = maxEntries;
  }

  /**
   * Add entry to history (newest first)
   */
  addEntry(entry: T): boolean {
    const current = this.load<T[]>() || [];

    // Add to beginning and trim to max length
    const updated = [entry, ...current].slice(0, this.maxEntries);

    return this.save(updated);
  }

  /**
   * Get all history entries
   */
  getEntries(): T[] {
    return this.load<T[]>() || [];
  }

  /**
   * Clear all history
   */
  clearHistory(): boolean {
    return this.save<T[]>([]);
  }

  /**
   * Get history statistics
   */
  getStats(): { count: number; oldestEntry?: T; newestEntry?: T } {
    const entries = this.getEntries();
    return {
      count: entries.length,
      oldestEntry: entries.length > 0 ? entries[entries.length - 1] : undefined,
      newestEntry: entries.length > 0 ? entries[0] : undefined,
    };
  }
}

// Date transformation helpers for common serialization needs
export const dateTransforms = {
  /**
   * Serialize objects with Date properties to ISO strings
   */
  serialize: (data: unknown): unknown => {
    if (data instanceof Date) {
      return data.toISOString();
    }
    if (Array.isArray(data)) {
      return data.map(dateTransforms.serialize);
    }
    if (data && typeof data === "object") {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        result[key] = dateTransforms.serialize(value);
      }
      return result;
    }
    return data;
  },

  /**
   * Deserialize ISO strings back to Date objects
   */
  deserialize: (data: unknown): unknown => {
    if (typeof data === "string" && /^\d{4}-\d{2}-\d{2}T/.test(data)) {
      return new Date(data);
    }
    if (Array.isArray(data)) {
      return data.map(dateTransforms.deserialize);
    }
    if (data && typeof data === "object") {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        result[key] = dateTransforms.deserialize(value);
      }
      return result;
    }
    return data;
  },
};
