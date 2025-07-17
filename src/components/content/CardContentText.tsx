import React from "react";

interface CardContentTextProps {
  content: string;
}

const CardContentText: React.FC<CardContentTextProps> = ({ content }) => {
  return <p className="text-gray-700 dark:text-gray-300">{content}</p>;
};

export default CardContentText;
