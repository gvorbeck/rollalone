import { CardProps } from "@/data/definitions";

const hexTravel: CardProps = {
  title: "Hex Travel",
  contentType: "table",
  preContent:
    "Use this to generate overland exploration. Start by rolling for your first hex. When entering adjacent hexes, roll 3d12 to generate the next Hex.",
  content: [
    {
      title: "Danger Level (d6)",
      rows: [
        ["1", "Safe"],
        ["2-3", "Unsafe"],
        ["4-5", "Risky"],
        ["6", "Deadly"],
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
    {
      title: "Travel Time (d6 hours)",
      rows: [
        ["Desert/Arctic", "+2 hours (harsh conditions)"],
        ["Swamp", "+3 hours (difficult terrain)"],
        ["Grassland", "Base time (easy travel)"],
        ["Forest/Jungle", "+1 hour (dense vegetation)"],
        ["River/Coast", "Base time (following paths/shores)"],
        ["Ocean/Lake", "Special (requires boats/swimming)"],
        ["Mountain", "+4 hours (steep, treacherous)"],
      ],
    },
  ],
  postContent: [
    "*Terrain steps are circular:",
    "*Desert → Swamp → Grassland → Forest → River → Ocean → Mountain → Desert",
  ],
};

export default hexTravel;
