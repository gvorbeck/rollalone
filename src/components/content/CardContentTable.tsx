import React from "react";
import { TableData } from "../../data/definitions";

interface CardContentTableProps {
  content: TableData;
}

const CardContentTable: React.FC<CardContentTableProps> = ({ content }) => {
  return (
    <div className="overflow-x-auto">
      {content.title && (
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          {content.title}
        </h3>
      )}
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
        <tbody>
          {content.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-3 border-r border-gray-300 dark:border-gray-600 ${
                    cellIndex === 0
                      ? "font-semibold text-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
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
