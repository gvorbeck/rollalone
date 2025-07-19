export interface CardProps {
  title: string;
  contentType: "text" | "list" | "table";
  content: string | string[] | TableData | TableData[];
  preContent?: string;
  postContent?: string[];
  className?: string;
}

export interface TableData {
  title?: string;
  rows: string[][];
}
