import { useEffect, useState } from "react";
import GameArea from "../../Layout/GameArea";
import useGameScore from "../../../hooks/useGameScore";
import useStatusFlow from "../../../hooks/useStatusFlow";
import Initial from "../gamestatus/Initial";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import styles from "./visual-memory.module.css";
import { Size } from "../../../types";
import { wait } from "../../utils/wait";

const VisualMemory = () => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [activeSquares, setActiveSquares] = useState<number[]>([]);
  const [size, setSize] = useState<Size>({ width: 3, height: 3 });
  const [shield, setShield] = useState<number>(3);
  const [userGuess, setUserGuess] = useState<number[]>([]);
  const [feedbackColors, setFeedbackColors] = useState<Record<number, string>>({});
  const [showingPattern, setShowingPattern] = useState<boolean>(false);

  const { isInitial, isWaiting, isScore, setStatus } = useStatusFlow();
  const { score, lives, incrementScore, decrementLives, reset } = useGameScore(1, 3);

  useEffect(() => {
    if (isWaiting) {
      setUserGuess([]);
      setFeedbackColors({});
      InitializePattern(score);
    }
  }, [isWaiting]);

  useEffect(() => {
    if (pattern.length > 0) {
      wait(700).then(async () => {
        setShowingPattern(true);
        setActiveSquares(pattern);
        await wait(2000);
        setActiveSquares([]);
        setShowingPattern(false);
      });
    }
  }, [pattern]);

  const InitializePattern = (score: number) => {
    const gridSize = size.width * size.height;
    const baseSquares = 2 + score;
    const numberOfSquares = Math.min(baseSquares, gridSize);
    const newPattern = generatePattern(numberOfSquares, gridSize);
    setPattern(newPattern);
  };

  const generatePattern = (numberOfSquares: number, gridSize: number): number[] => {
    const indexes = Array.from({ length: gridSize }, (_, i) => i);
    const shuffle = indexes.sort(() => Math.random() - 0.5);
    return shuffle.slice(0, numberOfSquares);
  };

  const handlePress = async (index: number) => {
    if (showingPattern) return;
    if (userGuess.includes(index)) return;

    const newUserGuess = [...userGuess, index];
    setUserGuess(newUserGuess);

    const isCorrect = pattern.includes(index);

    setFeedbackColors((prev) => ({
      ...prev,
      [index]: isCorrect ? styles.isActive : styles.isIncorrect,
    }));

    if (!isCorrect) {
      setShield((prev) => prev - 1);
    }

    if (shield <= 1) {
      decrementLives();
      setShield(3);
      if (lives === 1) {
        setStatus("Score");
        return;
      }
      setUserGuess([]);
      setFeedbackColors({});
      InitializePattern(score);
      return;
    }

    const remainingPattern = pattern.filter((item) => !newUserGuess.includes(item));

    if (remainingPattern.length === 0) {
      incrementScore();
      setShield(3);
      await wait(1000);
      setUserGuess([]);
      setFeedbackColors({});
      InitializePattern(score + 1);
      if ((score + 1) % 3 === 0 && score < 13) {
        setSize((prev) => ({ width: prev.width + 1, height: prev.height + 1 }));
      }
    }
  };

  const handleReset = () => {
    reset();
    setStatus("Initial");
    setSize({ width: 3, height: 3 });
  };

  const gridSize = size.width * size.height;

  return (
    <GameArea>
      {isInitial && (
        <Initial
          title="Visual Memory Test"
          desc="Memorize the squares"
          setStatus={setStatus}
          icon={<HiOutlineSquaresPlus size={100} />}
        />
      )}
      {isWaiting && (
        <>
          <div className={styles.flexBlock}>
            <span>Level {score}</span>
            <span>Lives</span>
            {Array.from({ length: 3 }).map((_, index) => (
              <FaHeart
                size={25}
                key={index}
                className={`${index < (lives ?? 0) ? styles.livesActive : styles.livesInactive}`}
              />
            ))}
          </div>
          <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${size.width}, 1fr)` }}>
            {Array.from({ length: gridSize }).map((_, index) => (
              <div
                key={index}
                className={`${styles.square} ${activeSquares.includes(index) ? styles.isActive : ""} 
                ${feedbackColors[index]}`}
                onClick={() => handlePress(index)}
              ></div>
            ))}
          </div>
        </>
      )}
      {isScore && (
        <>
          <HiOutlineSquaresPlus size={100} />
          <h2>Visual Memory</h2>
          <h1>Level {score}</h1>
          <button onClick={handleReset}>Try Again</button>
        </>
      )}
    </GameArea>
  );
};

export default VisualMemory;
