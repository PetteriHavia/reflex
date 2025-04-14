import { useEffect } from "react";
import GameArea from "../../Layout/GameArea";
import { useState } from "react";
import { GameStatus } from "../../../types";
import { TbNumbers } from "react-icons/tb";
import styles from "./number-memory.module.css";

const NumberMemory = () => {
  const [number, setNumber] = useState<string | null>(null);
  const [previousNumber, setPreviousNumber] = useState<string>("");
  const [score, setScore] = useState<number>(0);
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
    if (previousNumber === number) {
      setScore((prev) => prev + 1);
      setDigitCount((prev) => prev + 1);
      setStatus("Score");
      return;
    }
    setStatus("Score");
  };

  return (
    <GameArea>
      <div className="container-inner">
        {status === "Initial" && (
          <>
            <div className="icon">
              <TbNumbers size={80} color="white" />
            </div>
            <h1>Number Memory</h1>
            <p>The average person can remember 7 numbers at once. Can you do more?</p>
            <button onClick={handleStart}>Start</button>
          </>
        )}
        {status === "Waiting" && <p className={styles.number}>{number}</p>}
        {status === "End" && (
          <>
            <p>What was the number?</p>
            <small>Press enter to submit</small>
            <input value={previousNumber} type="text" onChange={(e) => setPreviousNumber(e.target.value)} />
            <button onClick={checkAnswer}>Submit</button>
          </>
        )}
        {status === "Score" && (
          <>
            <p>Number</p>
            <p>{number}</p>
            <p>Your answer</p>
            <p>{previousNumber}</p>
            <p>Level {score}</p>
            {previousNumber === number ? (
              <button onClick={() => setStatus("Waiting")}>Next</button>
            ) : (
              <button onClick={handleReset}>Try Again</button>
            )}
          </>
        )}
      </div>
    </GameArea>
  );
};

export default NumberMemory;
