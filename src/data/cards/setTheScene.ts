import { CardProps } from "@/data/definitions";

const setTheScene: CardProps = {
  title: "Set the Scene",
  rollable: "2d6",
  contentType: "table",
  preContent:
    "Describe where your character is and what they are trying to accomplish, then roll or choose a scene complication. **Afterward, roll another d6—on a 5+ it is an Altered Scene.**",
  content: [
    {
      title: "Scene Complication (d6)",
      rows: [
        ["1", "Hostile forces oppose you"],
        ["2", "An obstacle blocks your way"],
        ["3", "Wouldn't it suck if..."],
        ["4", "An NPC acts suddenly"],
        ["5", "All is not as it seems"],
        ["6", "Things actually go as planned"],
      ],
    },
    {
      title: "Altered Scene (d6)",
      rows: [
        ["1", "A major detail of the scene is enhanced or somehow worse"],
        ["2", "The environment is different"],
        ["3", "Unexpected NPCs are present"],
        ["4", "Add a SCENE COMPLICATION"],
        ["5", "Add a PACING MOVE"],
        ["6", "Add a RANDOM EVENT"],
      ],
    },
  ],
};

export default setTheScene;
