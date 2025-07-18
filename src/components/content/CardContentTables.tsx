import React from "react";
import { TableData } from "@/data/definitions";
import { DESIGN_TOKENS } from "@/styles/tokens";

interface CardContentTablesProps {
  content: TableData[];
}

const CardContentTables: React.FC<CardContentTablesProps> = ({ content }) => {
  return (
    <div className="space-y-6">
      {content.map((table, tableIndex) => (
        <div key={tableIndex} className="overflow-x-auto">
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
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CardContentTables;
