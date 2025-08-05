import { CardProps } from "@/data/definitions";

const hexTravel: CardProps = {
  title: "Hex Travel",
  contentType: "table",
  preContent:
    "Use this to guide your PCs' exploration. Use Movement Points to determine how far they can travel in a day.",
  content: [
    {
      title: "Movement Points (MP)",
      subtitle:
        "Base Movement Points per day: 12 + Agility/Speed/ETC modifier. Party moves as fast as the slowest member of your party.",
      rows: [
        ["Dense Forest/Mountain/Swamp", "14 MP"],
        ["Desert/Forest/Hills", "9 MP"],
        ["Plains/Grassland", "6 MP (base)"],
        ["Road/River", "Half cost (min 6 MP)"],
      ],
    },
    {
      title: "Travel Events (d6)",
      rows: [
        ["1", "Random Encounter"],
        ["2-5", "None"],
        ["6", "RANDOM EVENT then SET THE SCENE"],
      ],
    },
  ],
};

export default hexTravel;
