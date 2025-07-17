import { FC } from "react";
import Hero from "./components/Hero";
import Card from "./components/Card";
import howToPlay from "./data/cards/howToPlay";

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Hero />
      <main className="container mx-auto px-4 py-10" role="main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title={howToPlay.title}
            contentType={howToPlay.contentType}
            content={howToPlay.content}
          />
          <Card
            title="Game Rules"
            contentType="text"
            content="Learn the basic rules of the game."
          />
          <Card
            title="Strategies"
            contentType="text"
            content="Discover winning strategies and tips."
          />
        </div>
      </main>
    </div>
  );
};

export default App;
