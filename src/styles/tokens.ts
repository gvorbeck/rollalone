// Design tokens for consistent styling across the application
export const DESIGN_TOKENS = {
  // Card styling
  card: {
    container:
      "bg-gray-800 shadow-md rounded-lg p-6 transition-shadow hover:shadow-lg",
    title: "text-xl font-semibold text-white mb-4",
    preContent: "text-gray-400 mb-4",
    postContent: "text-gray-400 mt-4",
  },

  // Text content styling
  text: {
    primary: "text-gray-300",
    secondary: "text-gray-400",
    heading: "text-white",
  },

  // Table styling
  table: {
    container: "min-w-full border-collapse border border-gray-600",
    row: "border-b border-gray-600 hover:bg-gray-700 transition-colors",
    cellBorder: "border-r border-gray-600",
    headerCell: "font-semibold text-center bg-gray-700 text-white",
    regularCell: "text-gray-300",
    title: "text-lg font-medium text-white mb-3",
  },

  // Post content (note) styling
  note: {
    container: "mt-4 p-4 bg-yellow-900/20 border-l-4 border-yellow-500",
    text: "text-gray-300",
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
    ordered: "list-none space-y-4 text-gray-300",
    item: "leading-relaxed relative flex items-start gap-3",
    number:
      "flex-shrink-0 w-7 h-7 bg-red-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-0.5 shadow-sm",
    content: "flex-1",
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
