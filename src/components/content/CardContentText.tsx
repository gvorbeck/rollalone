import React from "react";
import { DESIGN_TOKENS } from "@/styles/tokens";

interface CardContentTextProps {
  content: string;
}

const CardContentText: React.FC<CardContentTextProps> = ({ content }) => {
  return <p className={DESIGN_TOKENS.text.primary}>{content}</p>;
};

export default CardContentText;
