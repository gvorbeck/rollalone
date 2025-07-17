import { FC } from "react";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CardProps } from "@/data/definitions";
import { DESIGN_TOKENS } from "@/styles/tokens";

// Import all cards from centralized index
import * as cards from "@/data/cards";

// Organize cards by rows and columns using cleaner import structure
const cardRows: CardProps[][][] = [
  // Row 1: Core Gameplay
  [
    [cards.howToPlay, cards.playingCards, cards.quickReference],
    [cards.oracleYesNo, cards.oracleHow, cards.setTheScene],
    [cards.gmMoves, cards.randomEvents, cards.oracleFocus],
  ],
  // Row 2: Generators & Tools
  [
    [cards.plotHookGenerator, cards.npcGenerator],
    [cards.genericGenerator, cards.dungeonCrawler],
    [cards.hexCrawler, cards.advancedMoves],
  ],
  // Row 3: Information & Credits
  [
    [cards.aboutSystem],
    [cards.gameplayTips, cards.cardSystemNotes],
    [cards.acknowledgements],
  ],
];

const App: FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Hero />
        <main className={DESIGN_TOKENS.layout.container} role="main">
          {cardRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`${DESIGN_TOKENS.layout.grid} ${
                rowIndex < cardRows.length - 1
                  ? DESIGN_TOKENS.layout.spacing.rowGap
                  : ""
              }`}
            >
              {row.map((column, columnIndex) => (
                <div key={columnIndex} className={DESIGN_TOKENS.layout.column}>
                  {column.map((card, cardIndex) => (
                    <Card
                      key={`${rowIndex}-${columnIndex}-${cardIndex}`}
                      title={card.title}
                      contentType={card.contentType}
                      content={card.content}
                      preContent={card.preContent}
                      postContent={card.postContent}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
