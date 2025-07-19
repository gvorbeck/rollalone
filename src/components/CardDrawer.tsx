import React, { useState, useEffect } from "react";
import {
  cardDrawer,
  type PlayingCard,
  type CardDrawResult,
} from "@/utils/cardDrawer";
import { useFAB } from "@/contexts/FABContext";
import { FAB } from "@/components/ui/FAB";
import { Button } from "@/components/ui/Button";
import { CloseButton } from "@/components/ui/CloseButton";
import { AnimatedPanel } from "@/components/ui/AnimatedPanel";
import { UIIcons } from "@/components/ui/Icons";
import { CARD_STYLES, TEXT_STYLES } from "@/utils/layout";

const CardDrawer: React.FC = () => {
  const { activeFAB, toggleFAB } = useFAB();
  const isOpen = activeFAB === "cardDrawer";
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
    <>
      {/* Card Draw Result Popup */}
      {showResult && (
        <div className="fixed bottom-22 right-4 sm:right-24 z-50 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-[calc(100vw-2rem)] sm:max-w-xs animate-fade-in">
          <div className="text-center">
            <div className="text-2xl mb-2">{lastDrawnCard?.display}</div>
            <div className="text-sm whitespace-pre-line">{resultMessage}</div>
          </div>
        </div>
      )}

      {/* Expanded Panel */}
      <div className="fixed bottom-6 right-4 sm:right-24 z-50">
        <AnimatedPanel
          isOpen={isOpen}
          variant="floating"
          title="Card Drawer"
          className="absolute bottom-16 right-0 w-80 max-w-[calc(100vw-2rem)]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              id="card-drawer-title"
              className="text-lg font-semibold text-white"
            >
              Card Drawer
            </h3>
            <CloseButton
              onClick={() => toggleFAB("cardDrawer")}
              title="Close panel"
            />
          </div>

          {/* Deck Status */}
          <div className="mb-4 text-sm text-gray-300">
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
            <div className={`${CARD_STYLES.content} mb-4`}>
              <div className={`${TEXT_STYLES.muted} mb-1`}>Last drawn:</div>
              <div className="text-lg font-mono text-center text-gray-300">
                {lastDrawnCard.display}
              </div>
              <div className={`${TEXT_STYLES.caption} mt-1`}>
                {cardDrawer.getCardMeaning(lastDrawnCard)}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handleDrawCard}
              variant="primary"
              className="w-full"
            >
              Draw Card
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={handleReshuffleDeck}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                Reshuffle
              </Button>
              <Button
                onClick={handleResetDeck}
                variant="danger"
                size="sm"
                className="flex-1"
              >
                Reset Deck
              </Button>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-4 text-xs text-gray-400">
            <p className="mb-1">
              <strong>Suits:</strong> ♠ Physical, ♦ Technical, ♣ Mystical, ♥
              Social
            </p>
            <p>
              <strong>Jokers:</strong> Trigger automatic reshuffle + random
              event
            </p>
          </div>
        </AnimatedPanel>
      </div>

      {/* Floating Action Button */}
      <FAB
        onClick={() => toggleFAB("cardDrawer")}
        variant="red"
        position="right-23"
        isOpen={isOpen}
        title={isOpen ? "Close card drawer" : "Draw playing card"}
      >
        <UIIcons.PlayingCard />
      </FAB>
    </>
  );
};

export default CardDrawer;
