import React from "react";
import { DESIGN_TOKENS } from "@/styles/tokens";
import { parseFormattedText } from "@/utils/textFormatting";

interface CardContentPostContentProps {
  postContent: string[];
}

const CardContentPostContent: React.FC<CardContentPostContentProps> = ({
  postContent,
}) => {
  if (!postContent || postContent.length === 0) {
    return null;
  }

  return (
    <div className={DESIGN_TOKENS.note.container}>
      {postContent.map((paragraph, index) => (
        <p
          key={index}
          className={`${DESIGN_TOKENS.note.text} ${
            index < postContent.length - 1 ? "mb-3" : ""
          }`}
        >
          {parseFormattedText(paragraph)}
        </p>
      ))}
    </div>
  );
};

export default CardContentPostContent;
