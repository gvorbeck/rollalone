// Simple localStorage helpers

/**
 * Save data to localStorage with error handling
 */
export const saveToStorage = (key: string, data: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    console.warn(`Failed to save to localStorage: ${key}`);
  }
};

/**
 * Load data from localStorage with error handling
 */
export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    console.warn(`Failed to load from localStorage: ${key}`);
    return defaultValue;
  }
};
