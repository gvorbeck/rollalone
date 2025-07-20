import React from "react";
import clsx from "clsx";
import { CardProps, TableData } from "@/data/definitions";
import { DESIGN_TOKENS } from "@/styles/tokens";
import { parseFormattedText } from "@/utils/textFormatting";
import {
  CardContentText,
  CardContentList,
  CardContentTable,
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
        return (
          <CardContentTable content={content as TableData | TableData[]} />
        );
      default:
        return (
          <p className="text-gray-300">
            {typeof content === "string" ? content : "Invalid content type"}
          </p>
        );
    }
  };

  return (
    <article
      className={clsx(DESIGN_TOKENS.card.container, className)}
      data-card-title={title}
      data-testid="card"
      id={title.replace(/\s+/g, "-").toLowerCase()}
      aria-labelledby={`card-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <header>
        <h2
          className={DESIGN_TOKENS.card.title}
          id={`card-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {title}
        </h2>
        {preContent && (
          <div className={DESIGN_TOKENS.card.preContent}>
            {parseFormattedText(preContent)}
          </div>
        )}
      </header>
      <main>{renderContent()}</main>
      {postContent && (
        <footer>
          <CardContentPostContent postContent={postContent} />
        </footer>
      )}
    </article>
  );
};

export default Card;
