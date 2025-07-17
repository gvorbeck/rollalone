export interface CardProps {
  title: string;
  contentType: "text" | "list" | "image" | "table" | "dice";
  content: string | string[] | TableData | DiceConfig;
  preContent?: string;
  postContent?: string[];
  className?: string;
  // category?: "rules" | "oracle" | "generator" | "reference";
  // tags?: string[];
}

export interface TableData {
  title?: string;
  rows: string[][];
}

export interface DiceConfig {
  diceType: string; // "d6", "d20", etc.
  rollCount: number;
  modifier?: number;
  description: string;
}
