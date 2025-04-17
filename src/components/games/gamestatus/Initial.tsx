import React, { ReactNode } from "react";
import styles from "./game-status.module.css";
import { GameStatus } from "../../../types";

type InitialProps = {
  icon: ReactNode;
  title: string;
  desc: string;
  setStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
};

const Initial = ({ icon, title, desc, setStatus }: InitialProps) => {
  return (
    <div className={styles.content}>
      {icon}
      <h1>{title}</h1>
      <h2>{desc}</h2>
      <button onClick={() => setStatus("Waiting")}>Start</button>
    </div>
  );
};

export default Initial;
