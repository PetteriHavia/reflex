import { useEffect, useState } from "react";
import GameArea from "../../Layout/GameArea";
import { TbNumbers } from "react-icons/tb";
import styles from "./number-memory.module.css";
import Initial from "../gamestatus/Initial";
import useStatusFlow from "../../../hooks/useStatusFlow";
import useGameScore from "../../../hooks/useGameScore";

const NumberMemory = () => {
  const [number, setNumber] = useState<string | null>(null);
  const [previousNumber, setPreviousNumber] = useState<string>("");
  const [digitCount, setDigitCount] = useState<number>(1);

  const { status, setStatus, isInitial, isWaiting, isEnd, isScore } = useStatusFlow();
  const { score, incrementScore, reset } = useGameScore();

  useEffect(() => {
    let timeId: number;
    if (isWaiting) {
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

  const handleReset = () => {
    setStatus("Initial");
    reset();
    setDigitCount(1);
  };

  const checkAnswer = () => {
    const isCorrect = previousNumber === number;
    if (isCorrect) {
      incrementScore();
      setDigitCount((prev) => prev + 1);
    }
    setStatus("Score");
  };

  return (
    <GameArea>
      {isInitial && (
        <Initial
          setStatus={setStatus}
          icon={<TbNumbers size={80} color="white" />}
          title="Number Memory"
          desc="The average person can remember 7 numbers at once. Can you do more?"
        />
      )}
      {isWaiting && <p className={styles.currentNumber}>{number}</p>}
      {isEnd && (
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
      {isScore && (
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
    </GameArea>
  );
};

export default NumberMemory;
