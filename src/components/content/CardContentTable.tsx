import React from "react";
import { TableData } from "@/data/definitions";
import { DESIGN_TOKENS } from "@/styles/tokens";

interface CardContentTableProps {
  content: TableData;
}

const CardContentTable: React.FC<CardContentTableProps> = ({ content }) => {
  return (
    <div className="overflow-x-auto">
      {content.title && (
        <h3 className={DESIGN_TOKENS.table.title}>{content.title}</h3>
      )}
      <table className={DESIGN_TOKENS.table.container}>
        <tbody>
          {content.rows.map((row, rowIndex) => (
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
  );
};

export default CardContentTable;
