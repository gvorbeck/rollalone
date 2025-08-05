import React from "react";
import { TableData } from "@/data/definitions";
import CollapsibleTable from "./CollapsibleTable";

interface CardContentTableProps {
  content: TableData | TableData[];
}

const CardContentTable: React.FC<CardContentTableProps> = ({ content }) => {
  // Normalize content to always be an array
  const tables = Array.isArray(content) ? content : [content];

  return (
    <div className={tables.length > 1 ? "space-y-6" : ""}>
      {tables.map((table, tableIndex) => (
        <CollapsibleTable key={tableIndex} table={table} />
      ))}
    </div>
  );
};

export default CardContentTable;
