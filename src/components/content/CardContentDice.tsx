import React from "react";
import { DiceConfig } from "@/data/definitions";
import { DESIGN_TOKENS } from "@/styles/tokens";

interface CardContentDiceProps {
  content: DiceConfig;
}

const CardContentDice: React.FC<CardContentDiceProps> = ({ content }) => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 bg-blue-900 text-blue-200 px-4 py-2 rounded-lg font-mono text-lg">
        <span>{content.rollCount}</span>
        <span>{content.diceType}</span>
        {content.modifier && (
          <span>
            {content.modifier > 0 ? "+" : ""}
            {content.modifier}
          </span>
        )}
      </div>
      <p className={DESIGN_TOKENS.text.primary + " mt-3"}>
        {content.description}
      </p>
    </div>
  );
};

export default CardContentDice;
