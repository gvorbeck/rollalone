export interface CardProps {
  title: string;
  contentType: "text" | "list" | "image" | "table" | "dice";
  content: string | string[] | TableData | DiceConfig;
  className?: string;
  category?: "rules" | "oracle" | "generator" | "reference";
  tags?: string[];
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface DiceConfig {
  diceType: string; // "d6", "d20", etc.
  rollCount: number;
  modifier?: number;
  description: string;
}
