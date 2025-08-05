import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Tabs, { TabItem } from "../Tabs";

const mockTabItems: TabItem[] = [
  {
    id: "tab1",
    label: "Tab 1",
    content: <div>Content for Tab 1</div>,
  },
  {
    id: "tab2",
    label: "Tab 2",
    content: <div>Content for Tab 2</div>,
  },
  {
    id: "tab3",
    label: "Tab 3",
    content: <div>Content for Tab 3</div>,
  },
];

describe("Tabs", () => {
  it("renders all tab buttons", () => {
    render(<Tabs items={mockTabItems} />);

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
  });

  it("displays the first tab content by default", () => {
    render(<Tabs items={mockTabItems} />);

    expect(screen.getByText("Content for Tab 1")).toBeInTheDocument();
    expect(screen.queryByText("Content for Tab 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Content for Tab 3")).not.toBeInTheDocument();
  });

  it("displays the specified default tab content", () => {
    render(<Tabs items={mockTabItems} defaultTab="tab2" />);

    expect(screen.queryByText("Content for Tab 1")).not.toBeInTheDocument();
    expect(screen.getByText("Content for Tab 2")).toBeInTheDocument();
    expect(screen.queryByText("Content for Tab 3")).not.toBeInTheDocument();
  });

  it("switches tab content when clicking different tabs", () => {
    render(<Tabs items={mockTabItems} />);

    // Initially shows Tab 1 content
    expect(screen.getByText("Content for Tab 1")).toBeInTheDocument();

    // Click Tab 2
    fireEvent.click(screen.getByText("Tab 2"));
    expect(screen.queryByText("Content for Tab 1")).not.toBeInTheDocument();
    expect(screen.getByText("Content for Tab 2")).toBeInTheDocument();

    // Click Tab 3
    fireEvent.click(screen.getByText("Tab 3"));
    expect(screen.queryByText("Content for Tab 2")).not.toBeInTheDocument();
    expect(screen.getByText("Content for Tab 3")).toBeInTheDocument();
  });

  it("applies active styling to the current tab", () => {
    render(<Tabs items={mockTabItems} />);

    const tab1Button = screen.getByText("Tab 1");
    const tab2Button = screen.getByText("Tab 2");

    // Tab 1 should be active initially
    expect(tab1Button).toHaveClass("border-red-500", "text-red-400");
    expect(tab2Button).toHaveClass("border-transparent", "text-gray-400");

    // Click Tab 2
    fireEvent.click(tab2Button);

    // Tab 2 should now be active
    expect(tab1Button).toHaveClass("border-transparent", "text-gray-400");
    expect(tab2Button).toHaveClass("border-red-500", "text-red-400");
  });

  it("has proper accessibility attributes", () => {
    render(<Tabs items={mockTabItems} />);

    const tabNav = screen.getByRole("navigation", { name: "Card categories" });
    expect(tabNav).toBeInTheDocument();

    const tabButtons = screen.getAllByRole("tab");
    expect(tabButtons).toHaveLength(3);

    const activeTab = tabButtons[0];
    expect(activeTab).toHaveAttribute("aria-selected", "true");

    const inactiveTab = tabButtons[1];
    expect(inactiveTab).toHaveAttribute("aria-selected", "false");

    const tabPanel = screen.getByRole("tabpanel");
    expect(tabPanel).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Tabs items={mockTabItems} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
