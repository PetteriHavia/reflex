import { useEffect, useState } from "react";
import GameArea from "../Layout/GameArea";
import styles from "./reaction-time.module.css";
import { FaRegClock } from "react-icons/fa";
import { GameStatus } from "../../types";

const ReactionTime = () => {
  const [score, setScore] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [background, setBackground] = useState<string>(styles.blue);
  const [status, setStatus] = useState<GameStatus>("Initial");

  useEffect(() => {
    let timeID: number;

    if (status === "Waiting") {
      setScore(null);
      setStartTime(null);
      setBackground(styles.red);

      timeID = setTimeout(() => {
        setBackground(styles.green);
        setStartTime(Date.now);
        setStatus("End");
      }, 3000);
    }

    return () => {
      clearInterval(timeID);
    };
  }, [status]);

  const handeClick = () => {
    if (status === "Initial") {
      setStatus("Waiting");
      return;
    }

    if (status === "Waiting") {
      setStatus("TooFast");
      setBackground(styles.blue);
      return;
    }

    if (status === "End") {
      const countScore = Date.now() - (startTime as number);
      setScore(countScore);
      setBackground(styles.blue);
      setStatus("Score");
      return;
    }

    if (status === "TooFast") {
      setStatus("Waiting");
      return;
    }

    if (status === "Score") {
      setStatus("Waiting");
      return;
    }
  };

  return (
    <div>
      <GameArea background={background} onClick={handeClick}>
        {status === "Initial" && <p>Press to start</p>}
        {status === "Waiting" && <p>Wait for green...</p>}
        {status === "TooFast" && <p>Too Fast!</p>}
        {status === "Score" && score !== null && (
          <div className={styles.gameEnd}>
            <FaRegClock size={80} color="white" />
            <h1>{score} ms</h1>
            <p>Click to keep going</p>
          </div>
        )}
      </GameArea>
    </div>
  );
};

export default ReactionTime;
