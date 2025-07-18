import { CardProps } from "@/data/definitions";

const hexCrawler: CardProps = {
  title: "Hex Crawler",
  contentType: "table",
  preContent:
    "Use this to generate overland exploration. Start by rolling HEX TERRAIN for your first hex. When entering adjacent hexes, use NEW HEX to determine terrain based on your current location.",
  content: [
    {
      title: "Hex Terrain - Starting/Random (2d6)",
      rows: [
        ["2", "Desert/Arctic"],
        ["3", "Swamp"],
        ["4-6", "Grassland"],
        ["7-8", "Forest/Jungle"],
        ["9-10", "River/Coast"],
        ["11", "Ocean/Lake"],
        ["12", "Mountain"],
      ],
    },
    {
      title: "New Hex - Adjacent Terrain (2d6)",
      rows: [
        ["2-3", "Current terrain +1 step*"],
        ["4-8", "Same as current terrain"],
        ["9-11", "Current terrain +2 steps*"],
        ["12", "Roll HEX TERRAIN (random change)"],
      ],
    },
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
      title:
        "Points of Interest (Roll d6. On a 1, the hex has a point of interest. Use Detail Focus + Action Focus to determine what it is, or roll d12)",
      rows: [
        ["1-2", "Settlement"],
        ["3-4", "Structure"],
        ["5-6", "Natural landmark"],
        ["7-8", "Monster lair"],
        ["9-10", "Tomb"],
        ["11", "Temple"],
        ["12", "Dungeon entrance"],
      ],
    },
    {
      title: "Travel Events (d6)",
      rows: [
        ["1", "Random Encounter"],
        ["2-4", "None"],
        ["5", "RANDOM EVENT then SET THE SCENE"],
        ["6", "Cataclysm: Natural disaster or major threat"],
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

export default hexCrawler;
