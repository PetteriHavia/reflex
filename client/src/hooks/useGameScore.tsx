import { useState } from "react";

const useGameScore = (initialScore = 0, initialLives?: number) => {
  const [score, setScore] = useState<number>(initialScore);
  const [lives, setLives] = useState<number | undefined>(initialLives);

  const incrementScore = (amount: number = 1) => setScore((prev: number) => prev + amount);

  const decrementLives = () => {
    if (lives !== undefined) setLives((prev) => (prev ?? 0) - 1);
  };

  const reset = () => {
    setScore(initialScore);
    if (initialLives !== undefined) setLives(initialLives);
  };

  const isOutOfLives = lives !== undefined && lives! <= 0;

  return {
    score,
    setScore,
    lives,
    setLives,
    incrementScore,
    decrementLives,
    reset,
    isOutOfLives,
  };
};

export default useGameScore;
