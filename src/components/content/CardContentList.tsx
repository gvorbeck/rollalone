import React from "react";
import { DESIGN_TOKENS } from "@/styles/tokens";

interface CardContentListProps {
  content: string[];
}

const CardContentList: React.FC<CardContentListProps> = ({ content }) => {
  return (
    <ol className={DESIGN_TOKENS.list.ordered}>
      {content.map((item, index) => (
        <li key={index} className={DESIGN_TOKENS.list.item}>
          <div className={DESIGN_TOKENS.list.number}>{index + 1}</div>
          <div className={DESIGN_TOKENS.list.content}>{item}</div>
        </li>
      ))}
    </ol>
  );
};

export default CardContentList;
