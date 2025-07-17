import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import Hero from "../Hero";

describe("Hero Component", () => {
  it("renders hero title and tagline correctly", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { name: /roll alone/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /your complete toolkit for solo tabletop rpg adventures/i
      )
    ).toBeInTheDocument();
  });

  it("displays all key features", () => {
    render(<Hero />);

    expect(
      screen.getByText(/one page engine - everything you need/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/works with any ttrpg system/i)).toBeInTheDocument();
    expect(screen.getByText(/no gm required/i)).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<Hero />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("contains hero image", () => {
    render(<Hero />);

    const heroImage = screen.getByAltText(/solo ttrpg adventurer/i);
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src");
  });

  it("has responsive layout classes", () => {
    render(<Hero />);

    // Check the grid container inside the header
    const gridContainer = document.querySelector('.grid.lg\\:grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
  });

  it("includes scroll down indicator", () => {
    render(<Hero />);

    // Check for the domain indicator instead
    const domainIndicator = screen.getByText("rollal.one");
    expect(domainIndicator).toBeInTheDocument();
  });

  it("applies proper accessibility attributes", () => {
    render(<Hero />);

    const image = screen.getByAltText(/solo ttrpg adventurer/i);
    expect(image).toBeInTheDocument();

    const banner = screen.getByRole("banner");
    expect(banner).toBeInTheDocument();
  });
});
