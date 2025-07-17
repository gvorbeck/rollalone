import React, { useState } from 'react';
import { DiceRoll } from '../utils/diceRoller';

const DiceRoller: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastRoll, setLastRoll] = useState<string>('');

  const rollDice = (notation: string) => {
    try {
      const roll = new DiceRoll(notation);
      setLastRoll(`${notation}: ${roll.output}`);
    } catch (error) {
      console.error('Invalid dice notation:', error);
      setLastRoll('Invalid dice notation');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Simple Panel */}
      {isOpen && (
        <div className="mb-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 w-64">
          <div className="text-white text-sm mb-3">Quick Dice Roller</div>
          
          {lastRoll && (
            <div className="mb-3 p-2 bg-gray-700 rounded text-white text-sm">
              {lastRoll}
            </div>
          )}
          
          <div className="grid grid-cols-4 gap-2 mb-3">
            <button
              onClick={() => rollDice('1d4')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded text-sm"
            >
              d4
            </button>
            <button
              onClick={() => rollDice('1d6')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded text-sm"
            >
              d6
            </button>
            <button
              onClick={() => rollDice('1d8')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded text-sm"
            >
              d8
            </button>
            <button
              onClick={() => rollDice('1d10')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded text-sm"
            >
              d10
            </button>
            <button
              onClick={() => rollDice('1d12')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded text-sm"
            >
              d12
            </button>
            <button
              onClick={() => rollDice('1d20')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded text-sm"
            >
              d20
            </button>
            <button
              onClick={() => rollDice('1d100')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded text-sm"
            >
              d100
            </button>
            <button
              onClick={() => rollDice('2d6')}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded text-sm"
            >
              2d6
            </button>
          </div>
          
          {/* Advanced rolls */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => rollDice('2d20kh1')}
              className="bg-green-700 hover:bg-green-600 text-white py-2 px-2 rounded text-xs"
            >
              Advantage
            </button>
            <button
              onClick={() => rollDice('2d20kl1')}
              className="bg-red-700 hover:bg-red-600 text-white py-2 px-2 rounded text-xs"
            >
              Disadvantage
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110"
        title={isOpen ? 'Close dice roller' : 'Open dice roller'}
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
