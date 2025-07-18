import React, { useState, useEffect } from "react";
import { DiceRoll } from "../utils/diceRoller";
import { diceHistory, type DiceHistoryEntry } from "../utils/diceHistory";
import { useFAB } from "@/contexts/FABContext";
import { FAB } from "@/components/ui/FAB";
import { Button } from "@/components/ui/Button";
import { AnimatedPanel } from "@/components/ui/AnimatedPanel";
import { DiceIcons, UIIcons } from "@/components/ui/Icons";

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
  const { activeFAB, toggleFAB } = useFAB();
  const isOpen = activeFAB === "diceRoller";
  const [diceInput, setDiceInput] = useState<string>("");
  const [lastRoll, setLastRoll] = useState<string>("");
  const [history, setHistory] = useState<DiceHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Load history when component mounts
  useEffect(() => {
    setHistory(diceHistory.getHistory());
  }, []);

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
      const result = `${diceInput}: ${roll.output}`;
      setLastRoll(result);

      // Add to history
      diceHistory.addRoll(diceInput, roll.total, roll.output);
      setHistory(diceHistory.getHistory());
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
          className="absolute bottom-16 right-0 w-96 max-w-[calc(100vw-2rem)]"
        >
          {/* ...existing code... */}
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
