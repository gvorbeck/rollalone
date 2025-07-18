import React, { useState } from "react";
import { DiceRoll } from "../utils/diceRoller";
import { useFAB } from "@/contexts/FABContext";

// SVG dice icon components
const DiceIcons = {
  d2: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" fill="currentColor" />
    </svg>
  ),
  d4: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 2l10 18H2L12 2z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
    </svg>
  ),
  d6: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="16" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  d8: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 2l8 8-8 12L4 10l8-8z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  d10: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 2l7 6v8l-7 6-7-6V8l7-6z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="12" cy="9" r="1" fill="currentColor" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
    </svg>
  ),
  d12: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 2l4 3 4-1 2 4-2 4 2 4-2 4-4-1-4 3-4-3-4 1-2-4 2-4-2-4 2-4 4 1 4-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  d20: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 2l6 4 2 6-2 6-6 4-6-4-2-6 2-6 6-4z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  d100: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 2l5 3 3 5-3 5 3 5-3 5-5 3-5-3-3-5 3-5-3-5 3-5 5-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <text x="12" y="14" textAnchor="middle" fontSize="8" fill="currentColor">
        %
      </text>
    </svg>
  ),
};

// Dice configuration data with SVG icons
const DICE_TYPES = [
  { type: "d2", icon: <DiceIcons.d2 />, label: "d2", title: "Coin flip" },
  { type: "d4", icon: <DiceIcons.d4 />, label: "d4", title: undefined },
  { type: "d6", icon: <DiceIcons.d6 />, label: "d6", title: undefined },
  { type: "d8", icon: <DiceIcons.d8 />, label: "d8", title: undefined },
  { type: "d10", icon: <DiceIcons.d10 />, label: "d10", title: undefined },
  { type: "d12", icon: <DiceIcons.d12 />, label: "d12", title: undefined },
  { type: "d20", icon: <DiceIcons.d20 />, label: "d20", title: undefined },
  { type: "d100", icon: <DiceIcons.d100 />, label: "d%", title: undefined },
] as const;

const DiceRoller: React.FC = () => {
  const { activeFAB, toggleFAB } = useFAB();
  const isOpen = activeFAB === 'diceRoller';
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
      {/* Dice Roller Panel with Animation */}
      <div
        className={`absolute bottom-16 right-0 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 w-80 max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out transform ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-white text-sm font-medium">Quick Dice Roller</div>
          <button
            onClick={() => toggleFAB('diceRoller')}
            className="text-gray-400 hover:text-gray-200 transition-colors"
            title="Close dice roller"
          >
            ✕
          </button>
        </div>

        {/* Results Display */}
        {lastRoll && (
          <div className="mb-3 p-2 bg-gray-700 rounded text-white text-sm break-words">
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
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm border border-gray-600 focus:border-red-500 focus:outline-none min-w-0"
          />
          <button
            onClick={rollDice}
            disabled={!diceInput.trim()}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium flex-shrink-0"
          >
            Roll
          </button>
          <button
            onClick={clearInput}
            className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded text-sm flex-shrink-0"
            title="Clear input"
          >
            ↻
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

      {/* Floating Action Button with Rotation Animation */}
      <button
        onClick={() => toggleFAB('diceRoller')}
        className={`w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}
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
