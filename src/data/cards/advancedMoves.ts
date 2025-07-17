import { CardProps } from "../definitions";

const advancedMoves: CardProps = {
  title: "Advanced GM Moves",
  contentType: "text",
  preContent:
    "Though the GM Moves section is highly inspired by PbtA games, the system will work with virtually any tabletop RPG.",
  content:
    "The reason the PbtA framework was chosen is that it gamifies the role of the GM with discrete moves that can fit in a table.",
  postContent: [
    "**Pacing Moves:**",
    "Pacing Moves should be used to fill in the gaps during those times when the players would normally look to the GM to see what happens next. They represent the little prompting and extra details that a GM usually adds. Try using one whenever you want to move the action forward.",
    "",
    "**Failure Moves:**",
    "Failure Moves represent setbacks or partial successes. Maybe the roll failed, but the character still gets part of what they wanted or all of it with a cost. These moves keep the action moving during failures and can be used in virtually any RPG system instead of just saying 'no that failed'.",
    "",
    "**Non-PbtA Games:**",
    "When playing a Non-PbtA game, it is important to remember that not every failure should result in a GM Move. Sometimes the Spot check just fails because there was nothing there. GM Moves should be used when a roll fails and there are consequences for failure, or the action needs to pick up.",
    "",
    "**Example:** Checking the room for secret doors? Probably not. Climbing a cliff in the rain to escape group of cultists? Definitely.",
  ],
};

export default advancedMoves;
