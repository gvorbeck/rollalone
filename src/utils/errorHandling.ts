// Simple error handling utilities

/**
 * Simple error logging with console fallback
 */
export const logError = (message: string, error?: unknown): void => {
  console.error(message, error);
};

/**
 * Safe DOM operations
 */
export const errorHandlers = {
  dom: {
    querySelector: (selector: string): Element | null => {
      try {
        return document.querySelector(selector);
      } catch (error) {
        console.warn(
          `Failed to find element with selector: ${selector}`,
          error
        );
        return null;
      }
    },

    scrollToElement: (
      element: Element,
      options?: ScrollIntoViewOptions
    ): boolean => {
      try {
        element.scrollIntoView(options);
        return true;
      } catch (error) {
        console.warn("Failed to scroll to element", error);
        return false;
      }
    },
  },
};

/**
 * Error boundary helper
 */
export const createErrorBoundaryHandler = (componentName: string) => ({
  onError: (error: Error, errorInfo: { componentStack: string }) => {
    logError(`Error in ${componentName} component`, {
      originalError: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  },
});
