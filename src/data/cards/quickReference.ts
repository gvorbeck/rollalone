import { CardProps } from "@/data/definitions";

const quickReference: CardProps = {
  title: "Quick Reference",
  contentType: "list",
  preContent: "Essential mechanics at a glance:",
  content: [
    "Yes/No Oracle: Choose likelihood (Likely 3+, Even 4+, Unlikely 5+), roll 2d6",
    "How Oracle: Roll d6 for intensity (1=lacking, 2=less, 3-4=average, 5=more, 6=extraordinary)",
    "Set Scene: Roll d6 for complication, 5+ = Altered Scene",
    "GM Moves: Use Pacing Moves for lulls, Failure Moves for failed checks",
    "Random Events: ACTION FOCUS + TOPIC FOCUS",
    "Playing Cards: Use rank from tables + SUIT DOMAIN for interpretation",
  ],
  postContent: [
    "**Modifier (d6):** 1=but..., 6=and...",
    "**Suit Domains:** ♠=Physical, ♦=Technical, ♣=Mystical, ♥=Social",
  ],
};

export default quickReference;
