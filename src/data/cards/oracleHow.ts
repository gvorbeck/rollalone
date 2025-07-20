import { CardProps } from "@/data/definitions";

const oracleHow: CardProps = {
  title: "Oracle (How)",
  rollable: "d6",
  contentType: "table",
  preContent:
    "When you need to know how big, good, strong, numerous, etc. something is.",
  content: {
    title: "Answer (d6)",
    rows: [
      ["1", "Surprisingly lacking"],
      ["2", "Less than expected"],
      ["3-4", "About average"],
      ["5", "More than expected"],
      ["6", "Extraordinary"],
    ],
  },
};

export default oracleHow;
