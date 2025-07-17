import React from "react";
import clsx from "clsx";
import { CardProps, TableData, DiceConfig } from "../data/definitions";
import {
  CardContentText,
  CardContentList,
  CardContentTable,
  CardContentImage,
  CardContentDice,
  CardContentPostContent,
} from "./content";

const Card: React.FC<CardProps> = ({
  title,
  contentType,
  content,
  preContent,
  postContent,
  className = "",
}) => {
  const renderContent = () => {
    switch (contentType) {
      case "text":
        return <CardContentText content={content as string} />;
      case "list":
        return <CardContentList content={content as string[]} />;
      case "table":
        return <CardContentTable content={content as TableData} />;
      case "image":
        return <CardContentImage content={content as string} title={title} />;
      case "dice":
        return <CardContentDice content={content as DiceConfig} />;
      default:
        return (
          <p className="text-gray-700 dark:text-gray-300">
            {typeof content === "string" ? content : "Invalid content type"}
          </p>
        );
    }
  };

  return (
    <article
      className={clsx(
        "bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-shadow hover:shadow-lg",
        className
      )}
    >
      <header>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        {preContent && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">{preContent}</p>
        )}
      </header>
      {renderContent()}
      <footer>
        {postContent && <CardContentPostContent postContent={postContent} />}
      </footer>
    </article>
  );
};

export default Card;
