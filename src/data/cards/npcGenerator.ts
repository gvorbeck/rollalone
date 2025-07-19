import { CardProps } from "@/data/definitions";

const npcGenerator: CardProps = {
  title: "NPC Generator",
  contentType: "table",
  preContent:
    "Use this to generate NPCs that may be encountered while playing.",
  content: [
    {
      title: "Identity (Card)",
      rows: [
        ["2", "Outlaw"],
        ["3", "Drifter"],
        ["4", "Tradesman"],
        ["5", "Commoner"],
        ["6", "Soldier"],
        ["7", "Merchant"],
        ["8", "Specialist"],
        ["9", "Entertainer"],
        ["T", "Adherent"],
        ["J", "Leader"],
        ["Q", "Mystic"],
        ["K", "Adventurer"],
        ["A", "Lord"],
      ],
    },
    {
      title: "Goal (Card)",
      rows: [
        ["2", "Obtain"],
        ["3", "Learn"],
        ["4", "Harm"],
        ["5", "Restore"],
        ["6", "Find"],
        ["7", "Travel"],
        ["8", "Protect"],
        ["9", "Enrich Self"],
        ["T", "Avenge"],
        ["J", "Fulfill Duty"],
        ["Q", "Escape"],
        ["K", "Create"],
        ["A", "Serve"],
      ],
    },
    {
      title: "Notable Feature (d6)",
      rows: [
        ["1", "Unremarkable"],
        ["2", "Notable nature"],
        ["3", "Obvious physical trait"],
        ["4", "Quirk or mannerism"],
        ["5", "Unusual equipment"],
        ["6", "Unexpected age or origin"],
      ],
    },
    {
      title: "Current Situation",
      rows: [
        ["Attitude to PCs", "ORACLE (HOW)"],
        ["Conversation", "TOPIC FOCUS"],
      ],
    },
  ],
  postContent: [
    "*Draw a DETAIL FOCUS for the description of the notable feature.*",
  ],
};

export default npcGenerator;
