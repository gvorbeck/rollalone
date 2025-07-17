import { CardProps } from "../definitions";

const playingCards: CardProps = {
  title: "Using Playing Cards",
  preContent:
    "This system uses a deck of playing cards to inspire answers. Look up the rank in the appropriate table and combine with the SUIT DOMAIN below to determine the answer. When you draw a Joker, shuffle the deck and add a RANDOM EVENT.",
  contentType: "table",
  content: {
    title: "Suit Domain",
    rows: [
      ["♠", "Physical (appearance, existence)"],
      ["♦", "Technical (mental, operation)"],
      ["♣", "Mystical (meaning, capability)"],
      ["♥", "Social (personal, connection)"],
    ],
  },
};

export default playingCards;
