import React from "react";
import { scrollToCard } from "@/utils/scrollToCard";
import { useFAB } from "@/contexts/FABContext";
import { FAB } from "@/components/ui/FAB";
import { Button } from "@/components/ui/Button";
import { AnimatedPanel } from "@/components/ui/AnimatedPanel";
import { UIIcons } from "@/components/ui/Icons";

// Table of Contents data - organized by logical sections
const TOC_SECTIONS = [
  {
    title: "Core Gameplay",
    cards: [
      { title: "How to Play", id: "How to Play" },
      { title: "Using Playing Cards", id: "Using Playing Cards" },
      { title: "Quick Reference", id: "Quick Reference" },
      {
        title: "Gameplay Tips & Interpretation",
        id: "Gameplay Tips & Interpretation",
      },
    ],
  },
  {
    title: "Oracles & Decisions",
    cards: [
      { title: "Oracle (Yes/No)", id: "Oracle (Yes/No)" },
      { title: "Oracle (How)", id: "Oracle (How)" },
      { title: "Oracle (Focus)", id: "Oracle (Focus)" },
    ],
  },
  {
    title: "Scene & Story",
    cards: [
      { title: "Set the Scene", id: "Set the Scene" },
      { title: "Plot Hook Generator", id: "Plot Hook Generator" },
      {
        title: "Random Events & Complex Questions",
        id: "Random Events & Complex Questions",
      },
      { title: "GM Moves", id: "GM Moves" },
    ],
  },
  {
    title: "Characters & Generators",
    cards: [
      { title: "NPC Generator", id: "NPC Generator" },
      { title: "Generic Generator", id: "Generic Generator" },
      { title: "Advanced GM Moves", id: "Advanced GM Moves" },
    ],
  },
  {
    title: "Exploration",
    cards: [
      { title: "Dungeon Crawler", id: "Dungeon Crawler" },
      { title: "Hex Crawler", id: "Hex Crawler" },
    ],
  },
  {
    title: "Information",
    cards: [
      { title: "Acknowledgements & Credits", id: "Acknowledgements & Credits" },
    ],
  },
] as const;

const TableOfContents: React.FC = () => {
  const { activeFAB, toggleFAB } = useFAB();
  const isOpen = activeFAB === "toc";

  const handleCardClick = (cardId: string) => {
    scrollToCard(cardId);
    toggleFAB("toc"); // Close TOC after navigation
  };

  return (
    <>
      {/* TOC Panel with Animation */}
      <div className="fixed bottom-6 right-4 sm:right-44 z-50">
        <AnimatedPanel
          isOpen={isOpen}
          variant="floating"
          title="Table of Contents"
          className="absolute bottom-16 right-0 w-72 max-w-[calc(100vw-2rem)] max-h-96 overflow-y-auto custom-scrollbar"
        >
          <nav
            aria-labelledby="table-of-contents-title"
            role="navigation"
            aria-label="Page content navigation"
          >
            <h2
              id="table-of-contents-title"
              className="text-white text-sm mb-3 font-medium"
            >
              Table of Contents
            </h2>

            {TOC_SECTIONS.map((section, sectionIndex) => (
              <section
                key={section.title}
                className={sectionIndex > 0 ? "mt-4" : ""}
              >
                <h3 className="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-1" role="list">
                  {section.cards.map((card) => (
                    <li key={card.id} role="listitem">
                      <Button
                        onClick={() => handleCardClick(card.id)}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start px-2 py-1.5 text-sm text-gray-300 hover:text-white"
                        aria-label={`Navigate to ${card.title} section`}
                      >
                        {card.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </AnimatedPanel>
      </div>

      {/* Floating Action Button */}
      <FAB
        onClick={() => toggleFAB("toc")}
        variant="blue"
        // position="right-44"
        isOpen={isOpen}
        className={isOpen ? "rotate-180" : "rotate-0"}
        aria-expanded={isOpen}
        title={isOpen ? "Close table of contents" : "Open table of contents"}
      >
        <UIIcons.Menu />
      </FAB>
    </>
  );
};

export default TableOfContents;
