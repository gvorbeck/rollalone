import { CardProps } from "@/data/definitions";

const dungeonCrawler: CardProps = {
  title: "Dungeon Crawler",
  contentType: "table",
  preContent:
    "Use this when exploring a dangerous location like a typical dungeon. The first area always has 3 exits. As you explore, roll once on each table below to create the new area.",
  content: {
    title: "Location (d8)",
    rows: [
      ["1", "Typical area"],
      ["2", "Transitional area"],
      ["3", "Living area or meeting place"],
      ["4", "Working or utility area"],
      ["5", "Area with a special feature"],
      ["6", "Location for a specialized purpose"],
      ["7", "Ceremonial or ritual space"],
      ["8", "Abandoned or ruined area"],
    ],
  },
  postContent: [
    "**Dungeon Theme:**",
    "**How it looks:** DETAIL FOCUS",
    "**How it is used:** ACTION FOCUS",
    "",
    "**Encounter (d8):**",
    "**1-2** - None, **3-4** - Hostile enemies",
    "**5** - An obstacle blocks the way, **6** - Unique NPC or adversary",
    "**7** - Environmental hazard, **8** - Trap",
    "",
    "**Object (d8):**",
    "**1-2** - Nothing, or mundane objects, **3** - An interesting item or clue",
    "**4** - A useful tool, key, or device, **5** - Something valuable",
    "**6** - Rare or special item, **7** - Container (locked, trapped, or hidden)",
    "**8** - Furniture or fixture of interest",
    "",
    "**Total Exits (d6):**",
    "**1-2** - Dead end, **3-4** - 1 additional exit, **5-6** - 2 additional exits",
  ],
};

export default dungeonCrawler;
