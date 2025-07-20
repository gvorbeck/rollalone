import { FC } from "react";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Masonry from "@/components/Masonry";
import ErrorBoundary from "@/components/ErrorBoundary";
import DiceRoller from "@/components/DiceRoller";
import CardDrawer from "@/components/CardDrawer";
import TableOfContents from "@/components/TableOfContents";
import SEO from "@/components/SEO";
import { FABProvider } from "@/contexts/FABContext";
import { CardProps } from "@/data/definitions";

// Import all cards from centralized index
import * as cards from "@/data/cards";

// Flatten all cards into a single array for masonry layout
const allCards: CardProps[] = [
  // Core Gameplay
  cards.howToPlay,
  cards.playingCards,
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
      rollable={card.rollable}
    />
  ));

  return (
    <ErrorBoundary>
      <FABProvider>
        <SEO />
        <div className="min-h-screen bg-gray-900">
          {/* Skip Navigation Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded-md focus:font-medium"
          >
            Skip to main content
          </a>

          <Hero />
          <main
            id="main-content"
            className="container mx-auto px-4 py-10"
            role="main"
            aria-label="Solo TTRPG toolkit cards"
          >
            <h1 className="sr-only">Roll Alone - Solo Tabletop RPG Toolkit</h1>
            <section aria-label="RPG toolkit cards">
              <Masonry className="w-full">{cardElements}</Masonry>
            </section>
          </main>
          <nav
            className="fixed bottom-4 right-4 flex gap-2 sm:gap-4 z-50 fab-container"
            aria-label="Floating action buttons"
          >
            <TableOfContents />
            <CardDrawer />
            <DiceRoller />
          </nav>
        </div>
      </FABProvider>
    </ErrorBoundary>
  );
};

export default App;
