import React, { useState } from "react";
import { DiceRoll } from "../utils/diceRoller";

// Dice configuration data
const DICE_TYPES = [
  { type: "d2", icon: "🪙", label: "d2", title: "Coin flip" },
  { type: "d4", icon: "🔺", label: "d4", title: undefined },
  { type: "d6", icon: "⚀", label: "d6", title: undefined },
  { type: "d8", icon: "🔶", label: "d8", title: undefined },
  { type: "d10", icon: "🔟", label: "d10", title: undefined },
  { type: "d12", icon: "🎲", label: "d12", title: undefined },
  { type: "d20", icon: "🎯", label: "d20", title: undefined },
  { type: "d100", icon: "💯", label: "d%", title: undefined },
] as const;

const DiceRoller: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [diceInput, setDiceInput] = useState<string>("");
  const [lastRoll, setLastRoll] = useState<string>("");

  const addDie = (dieType: string) => {
    if (!diceInput) {
      setDiceInput(`1${dieType}`);
      return;
    }

    // Parse existing dice to see if we already have this die type
    const dicePattern = new RegExp(
      `(\\d+)${dieType.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      "g"
    );
    const match = dicePattern.exec(diceInput);

    if (match) {
      // Increment existing die count
      const currentCount = parseInt(match[1]);
      const newCount = currentCount + 1;
      setDiceInput(diceInput.replace(match[0], `${newCount}${dieType}`));
    } else {
      // Add new die type
      setDiceInput(`${diceInput}+1${dieType}`);
    }
  };

  const rollDice = () => {
    if (!diceInput.trim()) return;

    try {
      const roll = new DiceRoll(diceInput);
      setLastRoll(`${diceInput}: ${roll.output}`);
    } catch (error) {
      console.error("Invalid dice notation:", error);
      setLastRoll("Invalid dice notation");
    }
  };

  const clearInput = () => {
    setDiceInput("");
    setLastRoll("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Dice Roller Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 w-80">
          <div className="text-white text-sm mb-3">Quick Dice Roller</div>

          {/* Results Display */}
          {lastRoll && (
            <div className="mb-3 p-2 bg-gray-700 rounded text-white text-sm">
              {lastRoll}
            </div>
          )}

          {/* Input and Roll Button */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={diceInput}
              onChange={(e) => setDiceInput(e.target.value)}
              placeholder="1d20+3"
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600 focus:border-red-500 focus:outline-none"
            />
            <button
              onClick={rollDice}
              disabled={!diceInput.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium"
            >
              Roll
            </button>
            <button
              onClick={clearInput}
              className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded text-sm"
              title="Clear"
            >
              ✕
            </button>
          </div>

          {/* Dice Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {DICE_TYPES.map(({ type, icon, label, title }) => (
              <button
                key={type}
                onClick={() => addDie(type)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-2 rounded text-xs flex flex-col items-center gap-1"
                title={title}
              >
                <div className="text-lg">{icon}</div>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110"
        title={isOpen ? "Close dice roller" : "Open dice roller"}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4h16v16H4z"
          />
          <circle cx="8" cy="8" r="1" fill="currentColor" />
          <circle cx="16" cy="8" r="1" fill="currentColor" />
          <circle cx="8" cy="16" r="1" fill="currentColor" />
          <circle cx="16" cy="16" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default DiceRoller;
