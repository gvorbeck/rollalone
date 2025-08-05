import React from "react";
import { DESIGN_TOKENS } from "@/styles/tokens";
import { parseFormattedText } from "@/utils/textFormatting";
import { CardProps } from "@/data/definitions";

interface CardContentPostContentProps {
  postContent: CardProps["postContent"];
}

const CardContentPostContent: React.FC<CardContentPostContentProps> = ({
  postContent,
}) => {
  if (!postContent || postContent.length === 0) {
    return null;
  }

  return (
    <div className={DESIGN_TOKENS.note.container}>
      {postContent.map((item, index) => {
        // If it's a string, parse it for formatting
        if (typeof item === "string") {
          return (
            <p
              key={index}
              className={`${DESIGN_TOKENS.note.text} ${
                index < postContent.length - 1 ? "mb-3" : ""
              }`}
            >
              {parseFormattedText(item)}
            </p>
          );
        }

        // If it's a React component (function), render it
        if (typeof item === "function") {
          const Component = item;
          return (
            <div
              key={index}
              className={`${DESIGN_TOKENS.note.text} ${
                index < postContent.length - 1 ? "mb-3" : ""
              }`}
            >
              <Component />
            </div>
          );
        }
      })}
    </div>
  );
};

export default CardContentPostContent;
