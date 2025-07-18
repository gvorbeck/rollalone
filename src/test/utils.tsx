import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Custom render function with ErrorBoundary
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, {
    wrapper: ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>,
    ...options,
  });
};

// Mock card data for tests
export const mockCardData = {
  text: {
    title: "Test Text Card",
    contentType: "text" as const,
    content: "This is test content",
    preContent: "Pre content",
    postContent: ["Post content line 1", "Post content line 2"],
  },
  list: {
    title: "Test List Card",
    contentType: "list" as const,
    content: ["Item 1", "Item 2", "Item 3"],
  },
  table: {
    title: "Test Table Card",
    contentType: "table" as const,
    content: {
      title: "Test Table",
      rows: [
        ["1", "First row"],
        ["2", "Second row"],
      ],
    },
  },
  tables: {
    title: "Test Multiple Tables Card",
    contentType: "table" as const,
    content: [
      {
        title: "First Table",
        rows: [
          ["1", "First row"],
          ["2", "Second row"],
        ],
      },
      {
        title: "Second Table",
        rows: [
          ["A", "Row A"],
          ["B", "Row B"],
        ],
      },
    ],
  },
  dice: {
    title: "Test Dice Card",
    contentType: "dice" as const,
    content: {
      diceType: "d6",
      rollCount: 2,
      modifier: 1,
      description: "Roll 2d6+1",
    },
  },
};

// Helper to create DOM elements with data attributes
export const createMockCard = (title: string) => {
  const element = document.createElement("div");
  element.setAttribute("data-card-title", title);
  element.textContent = title;
  document.body.appendChild(element);
  return element;
};

// Helper to clean up DOM
export const cleanupDOM = () => {
  if (document.body) {
    document.body.innerHTML = "";
  }
};

export { customRender as render };
export * from "@testing-library/react";
