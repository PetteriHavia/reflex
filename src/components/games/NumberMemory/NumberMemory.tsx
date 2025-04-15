import { useEffect, useState } from "react";
import GameArea from "../../Layout/GameArea";
import { GameStatus } from "../../../types";
import { TbNumbers } from "react-icons/tb";
import styles from "./number-memory.module.css";

const NumberMemory = () => {
  const [number, setNumber] = useState<string | null>(null);
  const [previousNumber, setPreviousNumber] = useState<string>("");
  const [score, setScore] = useState<number>(1);
  const [status, setStatus] = useState<GameStatus>("Initial");
  const [digitCount, setDigitCount] = useState<number>(1);

  useEffect(() => {
    let timeId: number;
    if (status === "Waiting") {
      const generateRandomNumber = (digits: number): string => {
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        return Math.floor(Math.random() * (max - min) + min).toString();
      };
      const randomNumber = generateRandomNumber(digitCount);
      setNumber(randomNumber);
      timeId = setTimeout(() => {
        setPreviousNumber("");
        setStatus("End");
      }, 3000);
    }
    return () => {
      clearTimeout(timeId);
    };
  }, [status]);

  const handleStart = () => {
    setStatus("Waiting");
  };

  const handleReset = () => {
    setStatus("Initial");
    setScore(0);
    setDigitCount(1);
  };

  const checkAnswer = () => {
    const isCorrect = previousNumber === number;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setDigitCount((prev) => prev + 1);
    }
    setStatus("Score");
  };

  return (
    <GameArea>
      <>
        {status === "Initial" && (
          <>
            <div className="icon">
              <TbNumbers size={80} color="white" />
            </div>
            <h1>Number Memory</h1>
            <h2>The average person can remember 7 numbers at once. Can you do more?</h2>
            <button onClick={handleStart}>Start</button>
          </>
        )}
        {status === "Waiting" && <p className={styles.currentNumber}>{number}</p>}
        {status === "End" && (
          <>
            <div className="">
              <h2>What was the number?</h2>
              <span>Press enter to submit</span>
            </div>
            <input
              value={previousNumber}
              type="text"
              autoFocus
              onChange={(e) => setPreviousNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") checkAnswer();
              }}
            />
            <button onClick={checkAnswer}>Submit</button>
          </>
        )}
        {status === "Score" && (
          <>
            <span>Number</span>
            <p className={styles.numbers}>{number}</p>
            <span>Your answer</span>
            <p className={`${styles.numbers} ${previousNumber === number ? "" : styles.incorrect}`}>{previousNumber}</p>
            <p className={styles.level}>Level {score}</p>
            {previousNumber === number ? (
              <button onClick={() => setStatus("Waiting")}>Next</button>
            ) : (
              <button onClick={handleReset}>Try Again</button>
            )}
          </>
        )}
      </>
    </GameArea>
  );
};

export default NumberMemory;
