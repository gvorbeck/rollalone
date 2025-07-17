import React from "react";

interface CardContentListProps {
  content: string[];
}

const CardContentList: React.FC<CardContentListProps> = ({ content }) => {
  return (
    <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
      {content.map((item, index) => (
        <li key={index} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ol>
  );
};

export default CardContentList;
