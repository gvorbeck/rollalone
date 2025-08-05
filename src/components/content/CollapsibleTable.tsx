import React, { useState } from "react";
import { TableData } from "@/data/definitions";
import { DESIGN_TOKENS } from "@/styles/tokens";
import { UIIcons } from "@/components/ui/Icons";
import { parseMarkdownBold } from "@/utils/textFormatting";

interface CollapsibleTableProps {
  table: TableData;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ table }) => {
  const [isCollapsed, setIsCollapsed] = useState(
    table.defaultCollapsed ?? false
  );

  if (!table.collapsible) {
    // Simple non-collapsible table
    return (
      <div className="overflow-x-auto">
        {table.title && (
          <h3 className={DESIGN_TOKENS.table.title}>{table.title}</h3>
        )}
        <table className={DESIGN_TOKENS.table.container}>
          <tbody>
            {table.rows.map((row, rowIndex) => (
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
                    {parseMarkdownBold(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Collapsible table with simple show/hide
  return (
    <div className="overflow-x-auto">
      {table.title && (
        <div className="flex justify-between mb-2 items-start">
          <h3 className={DESIGN_TOKENS.table.title}>{table.title}</h3>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-2 mt-0.5 p-1 rounded hover:bg-gray-700/50 transition-colors flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200"
          >
            <UIIcons.ChevronDown
              className={`transition-transform duration-200 ${
                isCollapsed ? "-rotate-90" : ""
              }`}
              size="sm"
            />
            {isCollapsed ? "Show" : "Hide"}
          </button>
        </div>
      )}

      {!isCollapsed && (
        <table className={DESIGN_TOKENS.table.container}>
          <tbody>
            {table.rows.map((row, rowIndex) => (
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
                    {parseMarkdownBold(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CollapsibleTable;
