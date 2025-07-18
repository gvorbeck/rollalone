import { describe, expect, it, vi, beforeAll, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

// Component that throws an error
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>Working component</div>;
};

// Suppress console.error for error boundary tests
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe("ErrorBoundary Component", () => {
  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Working component")).toBeInTheDocument();
  });

  it("renders error UI when child component throws", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please try refreshing the page/i)
    ).toBeInTheDocument();
  });

  it("displays refresh button in error state", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByRole("button", { name: /refresh page/i });
    expect(refreshButton).toBeInTheDocument();
  });

  it("applies dark theme styling", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for main container with dark background
    const container = screen
      .getByText(/something went wrong/i)
      .closest(".min-h-screen");
    expect(container).toHaveClass("bg-gray-900");

    // Check for error card styling
    const errorCard = screen
      .getByText(/something went wrong/i)
      .closest(".bg-red-900\\/20");
    expect(errorCard).toHaveClass("border-red-800");
  });

  it("has proper accessibility attributes", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for the main error heading
    const heading = screen.getByRole("heading", {
      name: "Something went wrong",
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-lg", "font-semibold", "text-red-200");
  });

  it("displays error icon", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for SVG warning icon by class or content
    const svg = document.querySelector("svg.w-6.h-6.text-red-400");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("text-red-400");
  });

  it("handles multiple children", () => {
    render(
      <ErrorBoundary>
        <div>Child 1</div>
        <div>Child 2</div>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
    expect(screen.getByText("Working component")).toBeInTheDocument();
  });

  it("catches errors in nested components", () => {
    const NestedComponent = () => (
      <div>
        <ThrowError shouldThrow={true} />
      </div>
    );

    render(
      <ErrorBoundary>
        <NestedComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("does not catch errors in event handlers", () => {
    const ComponentWithHandler = () => {
      const handleClick = () => {
        throw new Error("Event handler error");
      };
      return <button onClick={handleClick}>Click me</button>;
    };

    render(
      <ErrorBoundary>
        <ComponentWithHandler />
      </ErrorBoundary>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();

    // Error boundary should not catch this
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  it("logs error to console", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
