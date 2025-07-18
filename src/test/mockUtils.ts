// Consolidated test setup utilities
import { vi, beforeEach, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

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

// Common mock setup for Web APIs
export const setupWebAPIMocks = () => {
  // ResizeObserver mock
  const mockResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
  global.ResizeObserver = mockResizeObserver;

  // IntersectionObserver mock
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // scrollIntoView mock
  Element.prototype.scrollIntoView = vi.fn();

  // window.scrollTo mock
  Object.defineProperty(window, "scrollTo", {
    value: vi.fn(),
    writable: true,
  });

  return { mockResizeObserver };
};

// Common test lifecycle setup
export const setupTestLifecycle = () => {
  let localStorageMock: ReturnType<typeof createLocalStorageMock>;
  let webAPIMocks: ReturnType<typeof setupWebAPIMocks>;

  beforeEach(() => {
    // Setup mocks
    localStorageMock = createLocalStorageMock();
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    webAPIMocks = setupWebAPIMocks();

    // Mock console.warn to avoid noise in tests
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  return {
    getLocalStorageMock: () => localStorageMock,
    getWebAPIMocks: () => webAPIMocks,
  };
};

// Common mock data generators
export const createMockDiceHistory = () => {
  const mockHistory: Array<{
    id: string;
    notation: string;
    result: number;
    breakdown: string;
    timestamp: Date;
  }> = [];

  return {
    mockHistory,
    addRoll: vi.fn((notation: string, result: number, breakdown: string) => {
      mockHistory.unshift({
        id: `mock_${Date.now()}`,
        notation,
        result,
        breakdown,
        timestamp: new Date(),
      });
    }),
    getHistory: vi.fn(() => [...mockHistory]),
    clearHistory: vi.fn(() => {
      mockHistory.length = 0;
    }),
    getHistoryInfo: vi.fn(() => ({
      totalRolls: mockHistory.length,
      oldestEntry:
        mockHistory.length > 0
          ? mockHistory[mockHistory.length - 1].timestamp
          : null,
      newestEntry: mockHistory.length > 0 ? mockHistory[0].timestamp : null,
    })),
  };
};

export const createMockCardDrawer = () => ({
  drawCard: vi.fn(),
  getDeckInfo: vi.fn(() => ({
    remainingCards: 52,
    drawnCards: 2,
    lastDrawn: {
      display: "A♠",
      rank: "A",
      suit: "♠",
      value: 1,
      isJoker: false,
    },
    shuffleCount: 0,
  })),
  getCardMeaning: vi.fn(() => "A♠ - Physical (appearance, existence)"),
  reshuffleDeck: vi.fn(),
  resetDeck: vi.fn(),
});

// Common utility functions for tests
export const createMockPlayingCard = (overrides = {}) => ({
  rank: "A",
  suit: "♠",
  value: 1,
  display: "A♠",
  isJoker: false,
  ...overrides,
});

export const createMockJoker = () => ({
  rank: "Joker",
  suit: "",
  value: 0,
  display: "Joker",
  isJoker: true,
});

// Helper for testing panel visibility states
export const expectPanelVisible = (panel: Element) => {
  expect(panel).toHaveClass("opacity-100");
  expect(panel).not.toHaveClass("pointer-events-none");
};

export const expectPanelHidden = (panel: Element) => {
  expect(panel).toHaveClass("opacity-0", "pointer-events-none");
};
