import { CardProps } from "@/data/definitions";

const oracleFocus: CardProps = {
  title: "Oracle (Focus)",
  contentType: "table",
  preContent:
    "When you have a broad question or need to know details about something, draw on one of the tables below. Remember to apply the SUIT DOMAIN when interpreting the result.",
  content: {
    title: "Action Focus (Card) - What does it do?",
    rows: [
      ["2", "Seek"],
      ["3", "Oppose"],
      ["4", "Communicate"],
      ["5", "Move"],
      ["6", "Harm"],
      ["7", "Create"],
      ["8", "Reveal"],
      ["9", "Command"],
      ["T", "Take"],
      ["J", "Protect"],
      ["Q", "Assist"],
      ["K", "Transform"],
      ["A", "Deceive"],
    ],
  },
  postContent: [
    "**Detail Focus (Card) - What kind of thing is it?**",
    "**2** - Small, **3** - Large, **4** - Old, **5** - New",
    "**6** - Mundane, **7** - Simple, **8** - Complex, **9** - Unsavory",
    "**T** - Specialized, **J** - Unexpected, **Q** - Exotic",
    "**K** - Dignified, **A** - Unique",
    "",
    "**Topic Focus (Card) - What is this about?**",
    "**2** - Current Need, **3** - Allies, **4** - Community, **5** - History",
    "**6** - Future Plans, **7** - Enemies, **8** - Knowledge, **9** - Rumors",
    "**T** - A Plot Arc, **J** - Recent Events, **Q** - Equipment",
    "**K** - A Faction, **A** - The PCs",
  ],
};

export default oracleFocus;
