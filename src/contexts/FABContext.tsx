import React, { createContext, useContext, useState, ReactNode } from "react";

// Types for FAB management
type FABType = "toc" | "cardDrawer" | "diceRoller" | null;

interface FABContextType {
  activeFAB: FABType;
  setActiveFAB: (fab: FABType) => void;
  toggleFAB: (fab: FABType) => void;
  openDiceRollerWithFormula: (formula: string) => void;
  diceFormula: string | null;
  clearDiceFormula: () => void;
}

const FABContext = createContext<FABContextType | undefined>(undefined);

interface FABProviderProps {
  children: ReactNode;
}

export const FABProvider: React.FC<FABProviderProps> = ({ children }) => {
  const [activeFAB, setActiveFAB] = useState<FABType>(null);
  const [diceFormula, setDiceFormula] = useState<string | null>(null);

  const toggleFAB = (fab: FABType) => {
    setActiveFAB((current) => (current === fab ? null : fab));
  };

  const openDiceRollerWithFormula = (formula: string) => {
    setDiceFormula(formula);
    setActiveFAB("diceRoller");
  };

  const clearDiceFormula = () => {
    setDiceFormula(null);
  };

  return (
    <FABContext.Provider
      value={{
        activeFAB,
        setActiveFAB,
        toggleFAB,
        openDiceRollerWithFormula,
        diceFormula,
        clearDiceFormula,
      }}
    >
      {children}
    </FABContext.Provider>
  );
};

export const useFAB = (): FABContextType => {
  const context = useContext(FABContext);
  if (context === undefined) {
    throw new Error("useFAB must be used within a FABProvider");
  }
  return context;
};
