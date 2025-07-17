import React, { useState } from "react";
import { scrollToCard } from "@/utils/scrollToCard";

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
      { title: "Enhanced Hex Crawler", id: "Enhanced Hex Crawler" },
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
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (cardId: string) => {
    scrollToCard(cardId);
    setIsOpen(false); // Close TOC after navigation
  };

  return (
    <div className="fixed bottom-6 right-20 z-50">
      {/* TOC Panel with Animation */}
      <div
        role="dialog"
        aria-labelledby="toc-title"
        className={`absolute bottom-16 right-0 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 w-72 max-h-96 overflow-y-auto transition-all duration-300 ease-out transform ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <div id="toc-title" className="text-white text-sm mb-3 font-medium">
          Table of Contents
        </div>

        {TOC_SECTIONS.map((section, sectionIndex) => (
          <div key={section.title} className={sectionIndex > 0 ? "mt-4" : ""}>
            <div className="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wide">
              {section.title}
            </div>
            <div className="space-y-1">
              {section.cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className="w-full text-left px-2 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-150"
                >
                  {card.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        title={isOpen ? "Close table of contents" : "Open table of contents"}
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default TableOfContents;
