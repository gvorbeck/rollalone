import { FC } from "react";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Masonry from "@/components/Masonry";
import ErrorBoundary from "@/components/ErrorBoundary";
import DiceRoller from "@/components/DiceRoller";
import CardDrawer from "@/components/CardDrawer";
import TableOfContents from "@/components/TableOfContents";
import { CardProps } from "@/data/definitions";

// Import all cards from centralized index
import * as cards from "@/data/cards";

// Flatten all cards into a single array for masonry layout
const allCards: CardProps[] = [
  // Core Gameplay
  cards.howToPlay,
  cards.playingCards,
  cards.quickReference,
  cards.oracleYesNo,
  cards.oracleHow,
  cards.setTheScene,
  cards.gmMoves,
  cards.randomEvents,
  cards.oracleFocus,

  // Generators & Tools
  cards.plotHookGenerator,
  cards.npcGenerator,
  cards.genericGenerator,
  cards.dungeonCrawler,
  cards.hexCrawler,
  cards.advancedMoves,

  // Information & Credits
  cards.gameplayTips,
  cards.cardSystemNotes,
  cards.acknowledgements,
];

const App: FC = () => {
  const cardElements = allCards.map((card, index) => (
    <Card
      key={`card-${index}`}
      title={card.title}
      contentType={card.contentType}
      content={card.content}
      preContent={card.preContent}
      postContent={card.postContent}
    />
  ));

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
        <Hero />
        <main className="container mx-auto px-4 py-10" role="main">
          <Masonry className="w-full">{cardElements}</Masonry>
        </main>
        <TableOfContents />
        <CardDrawer />
        <DiceRoller />
      </div>
    </ErrorBoundary>
  );
};

export default App;
