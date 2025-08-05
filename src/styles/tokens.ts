// Design tokens for consistent styling across the application
export const DESIGN_TOKENS = {
  // Card styling
  card: {
    container:
      "bg-gray-800 shadow-md rounded-lg p-6 transition-shadow hover:shadow-lg flex flex-col gap-4",
    header: "flex flex-col gap-2 items-start",
    title: "text-xl font-semibold text-white",
    preContent: "text-gray-400",
    postContent: "text-gray-400",
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
    headerCell: "font-semibold text-center bg-gray-700 text-white whitespace-nowrap",
    regularCell: "text-gray-300",
    title: "text-lg font-medium text-white mb-2",
    subtitle: "text-sm text-gray-400 mb-3",
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
