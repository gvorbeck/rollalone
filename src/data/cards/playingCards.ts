import { CardProps } from "@/data/definitions";

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
  postContent: [
    "**OPTIONAL: USE ONLY CARDS**\nWhen you would roll a d6, draw a card and use the rank divided by 2 (round down). Discard Aces.",
    "**OPTIONAL: USE ONLY DICE**\nWhen you would draw a card, roll a d12 for the rank and a d4 for the suit. On a 12, flip a coin to see if you use the Q or K.",
  ],
};

export default playingCards;
