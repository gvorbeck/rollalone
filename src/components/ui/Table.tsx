import React from "react";
import { DESIGN_TOKENS } from "@/styles/tokens";

interface TableProps {
  rows: string[][];
  className?: string;
}

/**
 * Reusable table component for consistent styling
 */
const Table: React.FC<TableProps> = ({ rows, className = "" }) => {
  return (
    <table className={`${DESIGN_TOKENS.table.container} ${className}`}>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={DESIGN_TOKENS.table.row}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={`px-4 py-3 ${DESIGN_TOKENS.table.cellBorder} ${
                  cellIndex === 0
                    ? DESIGN_TOKENS.table.headerCell
                    : DESIGN_TOKENS.table.regularCell
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
