import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import CardContentTable from "../CardContentTable";
import { TableData } from "@/data/definitions";

describe("CardContentTable Component", () => {
  it("renders table with proper structure", () => {
    const tableContent: TableData = {
      rows: [
        ["Header 1", "Header 2"],
        ["Row 1 Col 1", "Row 1 Col 2"],
      ],
    };
    render(<CardContentTable content={tableContent} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(0);
  });
});
