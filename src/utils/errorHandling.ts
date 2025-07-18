// Reusable error handling utilities
// Consolidates error handling patterns and logging

export type ErrorLevel = "error" | "warn" | "info";

export interface ErrorContext {
  component?: string;
  action?: string;
  data?: unknown;
  timestamp?: Date;
}

export interface ErrorHandlerOptions {
  level?: ErrorLevel;
  context?: ErrorContext;
  fallback?: unknown;
  shouldThrow?: boolean;
  logToConsole?: boolean;
}

/**
 * Centralized error handler with consistent logging
 */
export class ErrorHandler {
  private static loggers: Map<
    ErrorLevel,
    (message: string, data?: unknown) => void
  > = new Map([
    ["error", (msg, data) => console.error(msg, data)],
    ["warn", (msg, data) => console.warn(msg, data)],
    ["info", (msg, data) => console.info(msg, data)],
  ]);

  /**
   * Handle errors with consistent formatting and optional fallback
   */
  static handle<T>(
    error: Error | unknown,
    message: string,
    options: ErrorHandlerOptions = {}
  ): T | null {
    const {
      level = "error",
      context,
      fallback = null,
      shouldThrow = false,
      logToConsole = true,
    } = options;

    // Create structured error info
    const errorInfo = {
      message,
      originalError: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      context: {
        ...context,
        timestamp: new Date(),
      },
    };

    // Log to console if enabled
    if (logToConsole) {
      const logger = this.loggers.get(level) || console.error;
      logger(message, errorInfo);
    }

    // Throw if requested
    if (shouldThrow) {
      throw error instanceof Error ? error : new Error(message);
    }

    return fallback as T | null;
  }

  /**
   * Create a safe async wrapper that handles errors
   */
  static async safeAsync<T>(
    asyncFn: () => Promise<T>,
    errorMessage: string,
    options: ErrorHandlerOptions = {}
  ): Promise<T | null> {
    try {
      return await asyncFn();
    } catch (error) {
      return this.handle<T>(error, errorMessage, options);
    }
  }

  /**
   * Create a safe sync wrapper that handles errors
   */
  static safe<T>(
    syncFn: () => T,
    errorMessage: string,
    options: ErrorHandlerOptions = {}
  ): T | null {
    try {
      return syncFn();
    } catch (error) {
      return this.handle<T>(error, errorMessage, options);
    }
  }

  /**
   * Validate and handle storage operations
   */
  static storage<T>(
    operation: () => T,
    operationType: "save" | "load" | "clear",
    storageKey: string,
    fallback?: T
  ): T | null {
    return this.safe(
      operation,
      `Failed to ${operationType} data ${
        storageKey ? `for key "${storageKey}"` : ""
      }`,
      {
        level: "warn",
        context: {
          component: "Storage",
          action: operationType,
          data: { storageKey },
        },
        fallback,
      }
    );
  }

  /**
   * Validate network/API operations
   */
  static async network<T>(
    operation: () => Promise<T>,
    endpoint: string,
    fallback?: T
  ): Promise<T | null> {
    return this.safeAsync(
      operation,
      `Network request failed for endpoint: ${endpoint}`,
      {
        level: "error",
        context: {
          component: "Network",
          action: "request",
          data: { endpoint },
        },
        fallback,
      }
    );
  }
}

/**
 * Common error scenarios with pre-configured handlers
 */
export const errorHandlers = {
  /**
   * Handle localStorage operations
   */
  localStorage: {
    save: <T>(key: string, data: T): boolean => {
      return (
        ErrorHandler.storage(
          () => {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
          },
          "save",
          key,
          false
        ) || false
      );
    },

    load: <T>(key: string, defaultValue?: T): T | null => {
      return ErrorHandler.storage(
        () => {
          const stored = localStorage.getItem(key);
          return stored ? JSON.parse(stored) : defaultValue || null;
        },
        "load",
        key,
        defaultValue || null
      );
    },

    remove: (key: string): boolean => {
      return (
        ErrorHandler.storage(
          () => {
            localStorage.removeItem(key);
            return true;
          },
          "clear",
          key,
          false
        ) || false
      );
    },
  },

  /**
   * Handle DOM operations
   */
  dom: {
    querySelector: (selector: string): Element | null => {
      return ErrorHandler.safe(
        () => document.querySelector(selector),
        `Failed to find element with selector: ${selector}`,
        {
          level: "warn",
          context: {
            component: "DOM",
            action: "querySelector",
            data: { selector },
          },
        }
      );
    },

    scrollToElement: (
      element: Element,
      options?: ScrollIntoViewOptions
    ): boolean => {
      return (
        ErrorHandler.safe(
          () => {
            element.scrollIntoView(options);
            return true;
          },
          "Failed to scroll to element",
          {
            level: "warn",
            context: {
              component: "DOM",
              action: "scrollToElement",
              data: { options },
            },
            fallback: false,
          }
        ) || false
      );
    },
  },

  /**
   * Handle JSON operations
   */
  json: {
    parse: <T>(jsonString: string, defaultValue?: T): T | null => {
      return ErrorHandler.safe(
        () => JSON.parse(jsonString) as T,
        `Failed to parse JSON string: ${jsonString.substring(0, 100)}...`,
        {
          level: "warn",
          context: {
            component: "JSON",
            action: "parse",
          },
          fallback: defaultValue || null,
        }
      );
    },

    stringify: (data: unknown): string | null => {
      return ErrorHandler.safe(
        () => JSON.stringify(data),
        "Failed to stringify data to JSON",
        {
          level: "warn",
          context: {
            component: "JSON",
            action: "stringify",
          },
        }
      );
    },
  },
};

/**
 * Retry wrapper for operations that might fail temporarily
 */
export class RetryHandler {
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000,
    backoff: number = 2
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt === maxRetries) {
          throw lastError;
        }

        // Wait before retrying with exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(backoff, attempt - 1))
        );
      }
    }

    throw lastError!;
  }
}

/**
 * Type-safe error boundary helpers
 */
export const createErrorBoundaryHandler = (componentName: string) => ({
  onError: (error: Error, errorInfo: { componentStack: string }) => {
    ErrorHandler.handle(error, `Error in ${componentName} component`, {
      level: "error",
      context: {
        component: componentName,
        action: "render",
        data: errorInfo,
      },
      logToConsole: true,
    });
  },
});
