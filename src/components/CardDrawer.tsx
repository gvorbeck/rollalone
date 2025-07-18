import React, { useState, useEffect } from "react";
import {
  cardDrawer,
  type PlayingCard,
  type CardDrawResult,
} from "@/utils/cardDrawer";

interface CardDrawerProps {
  className?: string;
}

const CardDrawer: React.FC<CardDrawerProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastDrawnCard, setLastDrawnCard] = useState<PlayingCard | null>(null);
  const [deckInfo, setDeckInfo] = useState(cardDrawer.getDeckInfo());
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    // Update deck info when component mounts
    setDeckInfo(cardDrawer.getDeckInfo());
    setLastDrawnCard(cardDrawer.getDeckInfo().lastDrawn);
  }, []);

  const handleDrawCard = () => {
    const result: CardDrawResult = cardDrawer.drawCard();

    setLastDrawnCard(result.card);
    setDeckInfo(cardDrawer.getDeckInfo());

    // Create result message
    let message = `${result.card.display}`;
    const meaning = cardDrawer.getCardMeaning(result.card);
    message += `\n${meaning}`;

    if (result.deckReshuffled) {
      message += "\n🔄 Deck was reshuffled!";
    }

    if (result.card.isJoker) {
      message += "\n⚠️ Joker drawn - deck will be reshuffled!";
    }

    setResultMessage(message);
    setShowResult(true);

    // Auto-hide result after 5 seconds
    setTimeout(() => {
      setShowResult(false);
    }, 5000);
  };

  const handleReshuffleDeck = () => {
    cardDrawer.reshuffleDeck();
    setDeckInfo(cardDrawer.getDeckInfo());
    setResultMessage("🔄 Deck reshuffled!");
    setShowResult(true);
    setTimeout(() => setShowResult(false), 2000);
  };

  const handleResetDeck = () => {
    cardDrawer.resetDeck();
    setDeckInfo(cardDrawer.getDeckInfo());
    setLastDrawnCard(null);
    setResultMessage("🆕 Fresh deck created!");
    setShowResult(true);
    setTimeout(() => setShowResult(false), 2000);
  };

  return (
    <div className={`fixed bottom-4 right-32 z-50 ${className}`}>
      {/* Card Draw Result Popup */}
      {showResult && (
        <div className="absolute bottom-16 right-0 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-xs animate-fade-in">
          <div className="text-center">
            <div className="text-2xl mb-2">{lastDrawnCard?.display}</div>
            <div className="text-sm whitespace-pre-line">{resultMessage}</div>
          </div>
        </div>
      )}

      {/* Expanded Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Card Drawer
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Deck Status */}
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Cards remaining:</span>
              <span className="font-mono">{deckInfo.remainingCards}/54</span>
            </div>
            <div className="flex justify-between">
              <span>Cards drawn:</span>
              <span className="font-mono">{deckInfo.drawnCards}</span>
            </div>
            <div className="flex justify-between">
              <span>Shuffles:</span>
              <span className="font-mono">{deckInfo.shuffleCount}</span>
            </div>
          </div>

          {/* Last Drawn Card */}
          {lastDrawnCard && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Last drawn:
              </div>
              <div className="text-lg font-mono text-center">
                {lastDrawnCard.display}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {cardDrawer.getCardMeaning(lastDrawnCard)}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleDrawCard}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium"
            >
              Draw Card
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleReshuffleDeck}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded text-sm"
              >
                Reshuffle
              </button>
              <button
                onClick={handleResetDeck}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
              >
                Reset Deck
              </button>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            <p className="mb-1">
              <strong>Suits:</strong> ♠ Physical, ♦ Technical, ♣ Mystical, ♥
              Social
            </p>
            <p>
              <strong>Jokers:</strong> Trigger automatic reshuffle + random
              event
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}
        title={isOpen ? "Close card drawer" : "Draw playing card"}
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
          <rect
            x="6"
            y="9"
            width="12"
            height="8"
            rx="1"
            className="fill-current opacity-30"
          />
          <rect
            x="8"
            y="11"
            width="8"
            height="4"
            rx="0.5"
            className="fill-current opacity-60"
          />
        </svg>
      </button>
    </div>
  );
};

export default CardDrawer;
