import { CardProps } from "@/data/definitions";

const oracleYesNo: CardProps = {
  title: "Oracle (Yes/No)",
  contentType: "table",
  preContent:
    "When you need to ask a simple question, choose the likelihood and roll 2d6.",
  content: {
    title: "Answer (2d6)",
    rows: [
      ["Likely", "Yes on 3+"],
      ["Even", "Yes on 4+"],
      ["Unlikely", "Yes on 5+"],
    ],
  },
  postContent: [
    "**Modifier (d6):**",
    "**1** - but...",
    "**2-5** - (no modifier)",
    "**6** - and...",
  ],
};

export default oracleYesNo;
