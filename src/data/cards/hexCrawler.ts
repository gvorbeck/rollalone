import { CardProps } from "@/data/definitions";

const hexCrawler: CardProps = {
  title: "Hex Crawler",
  contentType: "table",
  preContent:
    "Use this to generate overland exploration. Start by rolling HEX TERRAIN for your first hex. When entering adjacent hexes, use NEW HEX to determine terrain based on your current location.",
  content: [
    {
      title: "Hex Terrain - Starting/Random (1d6)",
      collapsible: true,
      defaultCollapsed: true,
      rows: [
        ["1", "Mountains"],
        ["2", "Hills"],
        ["3-5", "Plains"],
        ["6", "Swamp"],
      ],
    },
    {
      title: "New Hex - Adjacent Terrain",
      rows: [
        ["**TERRAIN (CURRENT)**", "**1D12 (NEW)**"],
        ["Mountains", "1-6: Mountains"],
        ["", "7-10: Hills"],
        ["", "11: Plains"],
        ["", "12: Swamp"],
        ["Hills", "1-4: Mountains"],
        ["", "5-8: Hills"],
        ["", "9-11: Plains"],
        ["", "12: Swamp"],
        ["Plains", "1: Mountains"],
        ["", "2-3: Hills"],
        ["", "4-9: Plains"],
        ["", "10-12: Swamp"],
        ["Swamp", "1: Mountains"],
        ["", "2: Hills"],
        ["", "3-8: Plains"],
        ["", "9-12: Swamp"],
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
