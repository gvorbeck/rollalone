import { CardProps } from "../definitions";

const plotHookGenerator: CardProps = {
  title: "Plot Hook Generator",
  contentType: "table",
  preContent:
    "Use this to generate plot hooks, quests, or missions for the PCs to follow.",
  content: {
    title: "Objective (d6)",
    rows: [
      ["1", "Eliminate a threat"],
      ["2", "Learn the truth"],
      ["3", "Recover something valuable"],
      ["4", "Escort or deliver to safety"],
      ["5", "Restore something broken"],
      ["6", "Save an ally in peril"],
    ],
  },
  postContent: [
    "**Adversaries (d6):**",
    "**1** - A powerful organization",
    "**2** - Outlaws",
    "**3** - Guardians",
    "**4** - Local inhabitants",
    "**5** - Enemy horde or force",
    "**6** - A new or recurring villain",
    "",
    "**Rewards (d6):**",
    "**1-2** - Money or valuables",
    "**3** - Knowledge and secrets",
    "**4** - Support of an ally",
    "**5** - Advance a plot arc",
    "**6** - A unique item of power",
  ],
};

export default plotHookGenerator;
