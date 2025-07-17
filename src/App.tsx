import { FC } from "react";
import Hero from "./components/Hero";
import Card from "./components/Card";
import { CardProps } from "./data/definitions";

// Row 1: Core Gameplay
import howToPlay from "./data/cards/howToPlay";
import playingCards from "./data/cards/playingCards";
import quickReference from "./data/cards/quickReference";
import oracleYesNo from "./data/cards/oracleYesNo";
import oracleHow from "./data/cards/oracleHow";
import setTheScene from "./data/cards/setTheScene";
import gmMoves from "./data/cards/gmMoves";
import randomEvents from "./data/cards/randomEvents";
import oracleFocus from "./data/cards/oracleFocus";

// Row 2: Generators & Tools
import plotHookGenerator from "./data/cards/plotHookGenerator";
import npcGenerator from "./data/cards/npcGenerator";
import genericGenerator from "./data/cards/genericGenerator";
import dungeonCrawler from "./data/cards/dungeonCrawler";
import hexCrawler from "./data/cards/hexCrawler";
import advancedMoves from "./data/cards/advancedMoves";

// Row 3: Information & Credits
import aboutSystem from "./data/cards/aboutSystem";
import gameplayTips from "./data/cards/gameplayTips";
import cardSystemNotes from "./data/cards/cardSystemNotes";
import acknowledgements from "./data/cards/acknowledgements";

// Organize cards by rows and columns
const cardRows: CardProps[][][] = [
  // Row 1: Core Gameplay
  [
    [howToPlay, playingCards, quickReference],
    [oracleYesNo, oracleHow, setTheScene], 
    [gmMoves, randomEvents, oracleFocus]
  ],
  // Row 2: Generators & Tools
  [
    [plotHookGenerator, npcGenerator],
    [genericGenerator, dungeonCrawler],
    [hexCrawler, advancedMoves]
  ],
  // Row 3: Information & Credits
  [
    [aboutSystem],
    [gameplayTips, cardSystemNotes],
    [acknowledgements]
  ]
];

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Hero />
      <main className="container mx-auto px-4 py-10" role="main">
        {cardRows.map((row, rowIndex) => (
          <div key={rowIndex} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${rowIndex < cardRows.length - 1 ? 'mb-8' : ''}`}>
            {row.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-6">
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
  );
};

export default App;
