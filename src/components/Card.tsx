import React from "react";
import clsx from "clsx";
import { CardProps, TableData, DiceConfig } from "@/data/definitions";
import { DESIGN_TOKENS } from "@/styles/tokens";
import {
  CardContentText,
  CardContentList,
  CardContentTable,
  CardContentImage,
  CardContentDice,
  CardContentPostContent,
} from "@/components/content";

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
          <p className="text-gray-300">
            {typeof content === "string" ? content : "Invalid content type"}
          </p>
        );
    }
  };

  return (
    <article className={clsx(DESIGN_TOKENS.card.container, className)}>
      <header>
        <h2 className={DESIGN_TOKENS.card.title}>{title}</h2>
        {preContent && (
          <p className={DESIGN_TOKENS.card.preContent}>{preContent}</p>
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
