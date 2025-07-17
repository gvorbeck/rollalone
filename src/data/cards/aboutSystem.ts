import { CardProps } from "@/data/definitions";

const aboutSystem: CardProps = {
  title: "About the System",
  contentType: "text",
  preContent:
    "One Page Solo Engine was designed to be incredibly concise and minimalistic, but still have all the essential tools required to run a game without a GM.",
  content:
    "The first two pages of this document are all that are required to play. This system provides every tool needed to run a solo game using any game system while using as few words as humanly possible.",
  postContent: [
    "**Intended Audience:**",
    "This is really meant for people who are already familiar with RPGs and playing them solo. Most of the tools assume you have already encountered similar concepts in other products. If you're completely new to solo or GM-less gaming, check out some of the products in the Acknowledgements to get started.",
    "",
    "**Design Philosophy:**",
    "There are a great many excellent tools out there to run a solo RPG game. I always found, however, that many of them were overly complicated. You shouldn't have to read 15 pages of rules and make 10 dice rolls just to determine what the guards in a room are doing.",
    "",
    "Also, many tools only provide part of what you need to actually play. Some only answer questions, while others only provide narrative structure or generate random elements. A complete oracle should do all these things.",
  ],
};

export default aboutSystem;
