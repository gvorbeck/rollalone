import { ReactNode, ComponentType } from "react";

export interface CardProps {
  title: string;
  contentType: "text" | "list" | "table";
  content: string | string[] | TableData | TableData[];
  preContent?: string;
  postContent?: (string | ReactNode | ComponentType<Record<string, unknown>>)[];
  className?: string;
  rollable?: string;
}

export interface TableData {
  title?: string;
  subtitle?: string;
  rows: string[][];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface TableData {
  title?: string;
  subtitle?: string;
  rows: string[][];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}
