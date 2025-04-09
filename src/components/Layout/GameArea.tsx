import React from "react";
import styles from "./game-area.module.css";

type GameAreaProps = {
  children: React.ReactNode;
  background?: string;
  onClick?: () => void;
};

const GameArea = ({ children, background, onClick }: GameAreaProps) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.wrapper} ${background ?? ""}
     ${onClick ? styles.clickable : ""}`}
    >
      <div className={`${styles.content}`}>{children}</div>
    </div>
  );
};

export default GameArea;
