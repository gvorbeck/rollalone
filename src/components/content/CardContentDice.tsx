import React from "react";
import { DiceConfig } from "../../data/definitions";

interface CardContentDiceProps {
  content: DiceConfig;
}

const CardContentDice: React.FC<CardContentDiceProps> = ({ content }) => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg font-mono text-lg">
        <span>{content.rollCount}</span>
        <span>{content.diceType}</span>
        {content.modifier && (
          <span>
            {content.modifier > 0 ? "+" : ""}
            {content.modifier}
          </span>
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mt-3">
        {content.description}
      </p>
    </div>
  );
};

export default CardContentDice;
