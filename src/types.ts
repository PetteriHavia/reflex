import { ReactNode } from "react";

export type GameInfo = {
  id: number;
  label: string;
  link: string;
  content: string;
  icon: ReactNode;
};

export type GameStatus = "TooFast" | "Waiting" | "End" | "Initial" | "Score";
