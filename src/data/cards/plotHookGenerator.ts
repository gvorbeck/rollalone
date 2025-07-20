import { CardProps } from "@/data/definitions";

const plotHookGenerator: CardProps = {
  title: "Plot Hook Generator",
  rollable: "3d6",
  contentType: "table",
  preContent:
    "Use this to generate plot hooks, quests, or missions for the PCs to follow.",
  content: [
    {
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
    {
      title: "Adversaries (d6)",
      rows: [
        ["1", "A powerful organization"],
        ["2", "Outlaws or bandits"],
        ["3", "Guardians or protectors"],
        ["4", "Local inhabitants"],
        ["5", "Enemy horde or force"],
        ["6", "A new or recurring villain"],
      ],
    },
    {
      title: "Rewards (d6)",
      rows: [
        ["1-2", "Money or valuables"],
        ["3", "Knowledge and secrets"],
        ["4", "Support of an ally"],
        ["5", "Advance a plot arc"],
        ["6", "A unique item of power"],
      ],
    },
  ],
};

export default plotHookGenerator;
