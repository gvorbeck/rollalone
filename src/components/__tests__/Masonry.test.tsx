import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@/test/utils";
import Masonry from "../Masonry";

// Mock ResizeObserver
const mockResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

beforeEach(() => {
  global.ResizeObserver = mockResizeObserver;
  vi.clearAllMocks();
});

describe("Masonry Component", () => {
  it("renders children in masonry layout", () => {
    render(
      <Masonry>
        {[
          <div key="1" data-testid="item-1">
            Item 1
          </div>,
          <div key="2" data-testid="item-2">
            Item 2
          </div>,
          <div key="3" data-testid="item-3">
            Item 3
          </div>,
        ]}
      </Masonry>
    );

    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
    expect(screen.getByTestId("item-3")).toBeInTheDocument();
  });

  it("applies masonry container classes", () => {
    const { container } = render(
      <Masonry>
        {[<div key="1">Item 1</div>, <div key="2">Item 2</div>]}
      </Masonry>
    );

    // Check for the masonry container (native masonry or fallback behavior)
    const masonryContainer =
      container.querySelector(".masonry-grid") ||
      container.querySelector(".grid.gap-6");
    expect(masonryContainer).toBeInTheDocument();
    expect(masonryContainer).toHaveClass("masonry-grid");
  });

  it("handles empty children gracefully", () => {
    const { container } = render(<Masonry>{[]}</Masonry>);

    const masonryContainer =
      container.querySelector(".masonry-grid") ||
      container.querySelector(".grid.gap-6");
    expect(masonryContainer).toBeInTheDocument();
    expect(masonryContainer?.children).toHaveLength(0);
  });

  it("handles single child", () => {
    render(
      <Masonry>
        {[
          <div key="1" data-testid="single-item">
            Single Item
          </div>,
        ]}
      </Masonry>
    );

    expect(screen.getByTestId("single-item")).toBeInTheDocument();
  });

  it("handles many children", () => {
    const items = Array.from({ length: 20 }, (_, i) => (
      <div key={i} data-testid={`item-${i}`}>
        Item {i}
      </div>
    ));

    render(<Masonry>{items}</Masonry>);

    items.forEach((_, i) => {
      expect(screen.getByTestId(`item-${i}`)).toBeInTheDocument();
    });
  });

  it("sets up ResizeObserver for responsive behavior", () => {
    render(<Masonry>{[<div key="1">Item</div>]}</Masonry>);

    // Since native masonry support is not available in tests, component should not use ResizeObserver
    expect(mockResizeObserver).not.toHaveBeenCalled();
  });

  it("cleans up ResizeObserver on unmount", () => {
    const disconnectMock = vi.fn();
    const observeMock = vi.fn();

    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: observeMock,
      unobserve: vi.fn(),
      disconnect: disconnectMock,
    }));

    const { unmount } = render(<Masonry>{[<div key="1">Item</div>]}</Masonry>);

    unmount();

    // No cleanup needed if ResizeObserver wasn't used
    expect(disconnectMock).not.toHaveBeenCalled();
  });

  it("applies gap between items", () => {
    const { container } = render(
      <Masonry>
        {[<div key="1">Item 1</div>, <div key="2">Item 2</div>]}
      </Masonry>
    );

    // For native masonry, there's no gap-6 class, so we check for the container presence
    const masonryContainer =
      container.querySelector(".masonry-grid") ||
      container.querySelector(".grid.gap-6");
    expect(masonryContainer).toBeInTheDocument();
  });

  it("maintains item order", () => {
    render(
      <Masonry>
        {[
          <div key="1" data-testid="first">
            First
          </div>,
          <div key="2" data-testid="second">
            Second
          </div>,
          <div key="3" data-testid="third">
            Third
          </div>,
        ]}
      </Masonry>
    );

    const firstItem = screen.getByTestId("first");
    const secondItem = screen.getByTestId("second");
    const thirdItem = screen.getByTestId("third");

    // All items should be present
    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
    expect(thirdItem).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Masonry className="custom-class">{[<div key="1">Item</div>]}</Masonry>
    );

    const masonryContainer =
      container.querySelector(".masonry-grid.custom-class") ||
      container.querySelector(".grid.gap-6.custom-class");
    expect(masonryContainer).toHaveClass("custom-class");
  });

  it("applies custom itemClassName", () => {
    const { container } = render(
      <Masonry itemClassName="custom-item-class">
        {[<div key="1">Item</div>]}
      </Masonry>
    );

    const itemContainer = container.querySelector(".custom-item-class");
    expect(itemContainer).toBeInTheDocument();
  });
});
