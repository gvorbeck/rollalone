// Design tokens for consistent styling across the application
export const DESIGN_TOKENS = {
  // Card styling
  card: {
    container:
      "bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-shadow hover:shadow-lg",
    title: "text-xl font-semibold text-gray-900 dark:text-white mb-4",
    preContent: "text-gray-600 dark:text-gray-400 mb-4",
    postContent: "text-gray-600 dark:text-gray-400 mt-4",
  },

  // Text content styling
  text: {
    primary: "text-gray-700 dark:text-gray-300",
    secondary: "text-gray-600 dark:text-gray-400",
    heading: "text-gray-900 dark:text-white",
  },

  // Table styling
  table: {
    container:
      "min-w-full border-collapse border border-gray-300 dark:border-gray-600",
    row: "border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
    cellBorder: "border-r border-gray-300 dark:border-gray-600",
    headerCell:
      "font-semibold text-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white",
    regularCell: "text-gray-700 dark:text-gray-300",
    title: "text-lg font-medium text-gray-900 dark:text-white mb-3",
  },

  // Post content (note) styling
  note: {
    container:
      "mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500",
    text: "text-gray-700 dark:text-gray-300",
  },

  // Layout
  layout: {
    container: "container mx-auto px-4 py-10",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    column: "flex flex-col gap-6",
    spacing: {
      rowGap: "mb-8",
    },
  },

  // List styling
  list: {
    ordered:
      "list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300",
    item: "leading-relaxed",
  },
} as const;

// Helper function to get nested token values
// Example usage: getToken('card.title') or getToken('text.primary')
export const getToken = (path: string): string => {
  try {
    const result = path
      .split(".")
      .reduce((obj: Record<string, unknown>, key: string) => {
        if (obj && typeof obj === "object" && key in obj) {
          return obj[key] as Record<string, unknown>;
        }
        throw new Error(`Token path '${path}' not found`);
      }, DESIGN_TOKENS as Record<string, unknown>);

    if (typeof result === "string") {
      return result;
    }
    throw new Error(`Token at path '${path}' is not a string`);
  } catch (error) {
    console.warn(`Failed to get token '${path}':`, error);
    return ""; // Return empty string as fallback
  }
};
