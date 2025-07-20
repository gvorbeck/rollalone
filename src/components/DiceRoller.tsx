import React, { useState, useEffect } from "react";
import { DiceRoll } from "../utils/diceRoller";
import { diceHistory, type DiceHistoryEntry } from "../utils/diceHistory";
import { useFAB } from "@/contexts/FABContext";
import { FAB } from "@/components/ui/FAB";
import { Button } from "@/components/ui/Button";
import { CloseButton } from "@/components/ui/CloseButton";
import { AnimatedPanel } from "@/components/ui/AnimatedPanel";
import { DiceIcons, UIIcons } from "@/components/ui/Icons";
import { CARD_STYLES, TEXT_STYLES, EMPTY_STATE } from "@/utils/layout";
import { SCROLL_CONTAINERS } from "@/utils/scrollbar";

// Dice configuration data with Icon components
const DICE_TYPES = [
  { type: "d2", icon: <DiceIcons.D2 />, label: "d2", title: "Coin flip" },
  { type: "d4", icon: <DiceIcons.D4 />, label: "d4", title: undefined },
  { type: "d6", icon: <DiceIcons.D6 />, label: "d6", title: undefined },
  { type: "d8", icon: <DiceIcons.D8 />, label: "d8", title: undefined },
  { type: "d10", icon: <DiceIcons.D10 />, label: "d10", title: undefined },
  { type: "d12", icon: <DiceIcons.D12 />, label: "d12", title: undefined },
  { type: "d20", icon: <DiceIcons.D20 />, label: "d20", title: undefined },
  { type: "d100", icon: <DiceIcons.D100 />, label: "d%", title: undefined },
] as const;

const DiceRoller: React.FC = () => {
  const { activeFAB, toggleFAB, diceFormula, clearDiceFormula } = useFAB();
  const isOpen = activeFAB === "diceRoller";
  const [diceInput, setDiceInput] = useState<string>("");
  const [lastRoll, setLastRoll] = useState<string>("");
  const [history, setHistory] = useState<DiceHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Load history when component mounts
  useEffect(() => {
    setHistory(diceHistory.getHistory());
  }, []);

  // Set dice input when formula is provided from context
  useEffect(() => {
    if (diceFormula && isOpen) {
      setDiceInput(diceFormula);
      clearDiceFormula(); // Clear the formula after using it
    }
  }, [diceFormula, isOpen, clearDiceFormula]);

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
      // Add new die to expression
      setDiceInput(diceInput + `+1${dieType}`);
    }
  };

  const rollDice = () => {
    if (!diceInput.trim()) return;

    try {
      const roll = new DiceRoll(diceInput);
      const result = `${diceInput}: ${roll.output}`;
      setLastRoll(result);

      // Add to history
      diceHistory.addRoll(diceInput, roll.total, roll.output);
      setHistory(diceHistory.getHistory());
      setDiceInput(""); // Clear input after successful roll
    } catch (error) {
      console.error("Invalid dice notation:", error);
      setLastRoll("Invalid dice notation");
    }
  };

  const clearInput = () => {
    setDiceInput("");
    setLastRoll("");
  };

  const clearHistory = () => {
    diceHistory.clearHistory();
    setHistory([]);
  };

  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <>
      {/* Dice Roller Panel with Animation */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatedPanel
          isOpen={isOpen}
          variant="floating"
          title="Quick Dice Roller"
          className="absolute bottom-16 right-0 w-96 max-w-[calc(100vw-2rem)]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              id="quick-dice-roller-title"
              className="text-lg font-semibold text-white"
            >
              Quick Dice Roller
            </h3>
            <CloseButton
              onClick={() => toggleFAB("diceRoller")}
              title="Close panel"
            />
          </div>

          <div className="flex flex-col gap-2">
            {/* History List */}
            {showHistory && (
              <div className={SCROLL_CONTAINERS.short}>
                {history.length === 0 ? (
                  <div className={EMPTY_STATE}>No rolls yet</div>
                ) : (
                  <div className="space-y-2">
                    {history.map((entry) => (
                      <div key={entry.id} className={CARD_STYLES.item}>
                        <div className="font-mono text-white">
                          {entry.notation}: {entry.result}
                        </div>
                        <div className={TEXT_STYLES.caption}>
                          {formatTimestamp(entry.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* History Toggle */}
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setShowHistory(!showHistory)}
                variant="ghost"
                size="sm"
                className="text-gray-400"
              >
                {showHistory ? "Hide" : "Show"} History ({history.length})
              </Button>
              {history.length > 0 && (
                <Button
                  onClick={clearHistory}
                  variant="ghost"
                  size="sm"
                  className="text-red-400"
                  title="Clear history"
                >
                  Clear History
                </Button>
              )}
            </div>

            {/* Last Roll Result */}
            {lastRoll && (
              <div className={CARD_STYLES.content}>
                <div className={TEXT_STYLES.muted}>Last roll:</div>
                <div className="font-mono text-white">{lastRoll}</div>
              </div>
            )}

            {/* Dice Input */}
            <input
              type="text"
              value={diceInput}
              onChange={(e) => setDiceInput(e.target.value)}
              placeholder="1d20+3"
              name="dice-input"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />

            {/* Quick Dice Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {DICE_TYPES.map((dice) => (
                <Button
                  key={dice.type}
                  onClick={() => addDie(dice.type)}
                  variant="secondary"
                  size="sm"
                  className="flex flex-col items-center gap-1 py-3"
                  title={dice.title}
                >
                  {dice.icon}
                  <span className="text-xs">{dice.label}</span>
                </Button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={rollDice}
                variant="primary"
                className="flex-1"
                disabled={!diceInput.trim()}
              >
                Roll
              </Button>
              <Button
                onClick={clearInput}
                variant="secondary"
                size="sm"
                title="Clear input"
              >
                Clear
              </Button>
            </div>
          </div>
        </AnimatedPanel>
      </div>

      {/* Floating Action Button with Rotation Animation */}
      <FAB
        onClick={() => toggleFAB("diceRoller")}
        variant="red"
        position="right-6"
        isOpen={isOpen}
        title={isOpen ? "Close dice roller" : "Open dice roller"}
      >
        <UIIcons.DiceRoller />
      </FAB>
    </>
  );
};

export default DiceRoller;
