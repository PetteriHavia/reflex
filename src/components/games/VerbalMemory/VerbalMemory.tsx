import { useEffect, useState } from "react";
import GameArea from "../../Layout/GameArea";
import { GameStatus } from "../../../types";
import Initial from "../gamestatus/Initial";
import { LuBookA } from "react-icons/lu";
import styles from "./verbal-memory.module.css";
import { verbalData } from "../../../gameData";

const VerbalMemory = () => {
  const [status, setStatus] = useState<GameStatus>("Initial");
  const [score, setScore] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>("testing");
  const [seenWords, setSeenWords] = useState<Array<string>>(["second"]);
  const [lives, setLives] = useState<number>(3);

  useEffect(() => {
    if (lives <= 0 || (status === "Waiting" && seenWords.length >= verbalData.length)) {
      setStatus("Score");
    }
    if (status === "Waiting") {
      const unseenWords = verbalData.filter((word) => !seenWords.includes(word));
      const useSeenWords = Math.random() < 0.3;
      const candidates = useSeenWords && seenWords.length > 0 ? seenWords : unseenWords;
      const randomWord = candidates[Math.floor(Math.random() * candidates.length)];
      setCurrentWord(randomWord);
    }
  }, [status, score, lives]);

  const handleReset = () => {
    setStatus("Initial");
    setScore(0);
    setLives(3);
  };

  const checkWord = (type: string) => {
    const isSeen = seenWords.includes(currentWord);

    if (type === "seen" && isSeen) {
      setScore((prev) => prev + 1);
      return;
    }

    if (type === "new" && !isSeen) {
      setScore((prev) => prev + 1);
      setSeenWords((prev) => [...prev, currentWord]);
      return;
    }
    setLives((prev) => prev - 1);
  };

  return (
    <div>
      <GameArea>
        {status === "Initial" && (
          <Initial
            setStatus={setStatus}
            icon={<LuBookA size={100} />}
            title="Verbal Memory Test"
            desc="You will be shown words, one at a time. If you've seen a word during the test, click. If it's a new word, click "
          />
        )}
        {status === "Waiting" && (
          <>
            <div className={styles.gap}>
              <span>
                Lives |<span> {lives}</span>
              </span>
              <span>
                Score |<span> {score}</span>
              </span>
            </div>
            <h1>{currentWord}</h1>
            <div className={styles.gap}>
              <button name="seen" onClick={(e) => checkWord((e.target as HTMLButtonElement).name)}>
                SEEN
              </button>
              <button name="new" onClick={(e) => checkWord((e.target as HTMLButtonElement).name)}>
                NEW
              </button>
            </div>
          </>
        )}
        {status === "Score" && (
          <>
            <LuBookA size={100} />
            <h2>Verbal Memory</h2>
            <h1>{score} words</h1>
            <p>Press start to try again</p>
            <button onClick={handleReset}>Try Again</button>
          </>
        )}
      </GameArea>
    </div>
  );
};

export default VerbalMemory;
