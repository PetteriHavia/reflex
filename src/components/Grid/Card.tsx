import React from "react";
import { Link } from "react-router";
import { GameInfo } from "../../types";
import styles from "./grid.module.css";

type Props = {
  game: GameInfo;
};

const Card = ({ game }: Props) => {
  return (
    <Link to="/reaction-time">
      <div className={styles.card}>
        <div className={styles.icon}>{game.icon}</div>
        <h2>{game.label}</h2>
        <p>{game.content}</p>
      </div>
    </Link>
  );
};

export default Card;
