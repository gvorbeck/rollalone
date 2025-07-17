import { FC } from "react";
import Hero from "./components/Hero";
import Card from "./components/Card";

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

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Hero />
      <main className="container mx-auto px-4 py-10" role="main">
        {/* Row 1: Core Gameplay */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col gap-6">
            <Card
              title={howToPlay.title}
              contentType={howToPlay.contentType}
              content={howToPlay.content}
            />
            <Card
              title={playingCards.title}
              contentType={playingCards.contentType}
              content={playingCards.content}
              preContent={playingCards.preContent}
              postContent={playingCards.postContent}
            />
            <Card
              title={quickReference.title}
              contentType={quickReference.contentType}
              content={quickReference.content}
              preContent={quickReference.preContent}
              postContent={quickReference.postContent}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Card
              title={oracleYesNo.title}
              contentType={oracleYesNo.contentType}
              content={oracleYesNo.content}
              preContent={oracleYesNo.preContent}
              postContent={oracleYesNo.postContent}
            />
            <Card
              title={oracleHow.title}
              contentType={oracleHow.contentType}
              content={oracleHow.content}
              preContent={oracleHow.preContent}
            />
            <Card
              title={setTheScene.title}
              contentType={setTheScene.contentType}
              content={setTheScene.content}
              preContent={setTheScene.preContent}
              postContent={setTheScene.postContent}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Card
              title={gmMoves.title}
              contentType={gmMoves.contentType}
              content={gmMoves.content}
              preContent={gmMoves.preContent}
              postContent={gmMoves.postContent}
            />
            <Card
              title={randomEvents.title}
              contentType={randomEvents.contentType}
              content={randomEvents.content}
              postContent={randomEvents.postContent}
            />
            <Card
              title={oracleFocus.title}
              contentType={oracleFocus.contentType}
              content={oracleFocus.content}
              preContent={oracleFocus.preContent}
              postContent={oracleFocus.postContent}
            />
          </div>
        </div>

        {/* Row 2: Generators & Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col gap-6">
            <Card
              title={plotHookGenerator.title}
              contentType={plotHookGenerator.contentType}
              content={plotHookGenerator.content}
              preContent={plotHookGenerator.preContent}
              postContent={plotHookGenerator.postContent}
            />
            <Card
              title={npcGenerator.title}
              contentType={npcGenerator.contentType}
              content={npcGenerator.content}
              preContent={npcGenerator.preContent}
              postContent={npcGenerator.postContent}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Card
              title={genericGenerator.title}
              contentType={genericGenerator.contentType}
              content={genericGenerator.content}
              preContent={genericGenerator.preContent}
              postContent={genericGenerator.postContent}
            />
            <Card
              title={dungeonCrawler.title}
              contentType={dungeonCrawler.contentType}
              content={dungeonCrawler.content}
              preContent={dungeonCrawler.preContent}
              postContent={dungeonCrawler.postContent}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Card
              title={hexCrawler.title}
              contentType={hexCrawler.contentType}
              content={hexCrawler.content}
              preContent={hexCrawler.preContent}
              postContent={hexCrawler.postContent}
            />
            <Card
              title={advancedMoves.title}
              contentType={advancedMoves.contentType}
              content={advancedMoves.content}
              preContent={advancedMoves.preContent}
              postContent={advancedMoves.postContent}
            />
          </div>
        </div>

        {/* Row 3: Information & Credits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-6">
            <Card
              title={aboutSystem.title}
              contentType={aboutSystem.contentType}
              content={aboutSystem.content}
              preContent={aboutSystem.preContent}
              postContent={aboutSystem.postContent}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Card
              title={gameplayTips.title}
              contentType={gameplayTips.contentType}
              content={gameplayTips.content}
              preContent={gameplayTips.preContent}
              postContent={gameplayTips.postContent}
            />
            <Card
              title={cardSystemNotes.title}
              contentType={cardSystemNotes.contentType}
              content={cardSystemNotes.content}
              preContent={cardSystemNotes.preContent}
              postContent={cardSystemNotes.postContent}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Card
              title={acknowledgements.title}
              contentType={acknowledgements.contentType}
              content={acknowledgements.content}
              preContent={acknowledgements.preContent}
              postContent={acknowledgements.postContent}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
