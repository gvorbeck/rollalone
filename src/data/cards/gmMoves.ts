import { CardProps } from "@/data/definitions";

const gmMoves: CardProps = {
  title: "GM Moves",
  contentType: "table",
  preContent:
    "When you need to advance the action, roll on the tables below and describe the results as the GM normally would.",
  content: [
    {
      title: "Pacing Moves (d6)",
      rows: [
        ["1", "Foreshadow Trouble"],
        ["2", "Reveal a New Detail"],
        ["3", "An NPC Takes Action"],
        ["4", "Advance a Threat"],
        ["5", "Advance a Plot"],
        ["6", "Add a RANDOM EVENT to the scene"],
      ],
    },
    {
      title: "Failure Moves (d6)",
      rows: [
        ["1", "Cause Harm"],
        ["2", "Put Someone in a Spot"],
        ["3", "Offer a Choice"],
        ["4", "Advance a Threat"],
        ["5", "Reveal an Unwelcome Truth"],
        ["6", "Foreshadow Trouble"],
      ],
    },
  ],
  postContent: [
    "**Use a PACING MOVE when there is a lull in the action, or you think 'what now?'**",
    "**Use a FAILURE MOVE to move things forward when the PCs fail a check.**",
  ],
};

export default gmMoves;
