// Consolidated test setup utilities
import { vi } from "vitest";

// Common mock setup for localStorage
export const createLocalStorageMock = () => {
  const store: Record<string, string> = {};

  return {
    store,
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
  };
};
