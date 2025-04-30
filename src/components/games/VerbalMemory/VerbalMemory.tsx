import { useEffect, useState } from "react";
import GameArea from "../../Layout/GameArea/GameArea";
import Initial from "../gamestatus/Initial";
import { LuBookA } from "react-icons/lu";
import styles from "./verbal-memory.module.css";
import { verbalData } from "../../../gameData";
import useStatusFlow from "../../../hooks/useStatusFlow";
import useGameScore from "../../../hooks/useGameScore";
import Info from "../../Layout/Info/Info";

const VerbalMemory = () => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [seenWords, setSeenWords] = useState<Array<string>>([]);
  const { isInitial, isWaiting, isScore, setStatus, status } = useStatusFlow();
  const { score, lives, incrementScore, decrementLives, reset, isOutOfLives } = useGameScore(0, 3);

  useEffect(() => {
    if (isOutOfLives || (status === "Waiting" && seenWords.length >= verbalData.length)) {
      setStatus("Score");
      return;
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
    reset();
  };

  const checkWord = (type: string) => {
    const isSeen = seenWords.includes(currentWord);

    if (type === "seen" && isSeen) {
      incrementScore();
      return;
    }

    if (type === "new" && !isSeen) {
      incrementScore();
      setSeenWords((prev) => [...prev, currentWord]);
      return;
    }
    decrementLives();
  };

  return (
    <div>
      <GameArea>
        {isInitial && (
          <Initial
            setStatus={setStatus}
            icon={<LuBookA size={100} />}
            title="Verbal Memory Test"
            desc="You will be shown words, one at a time. If you've seen a word during the test, click. If it's a new word, click "
          />
        )}
        {isWaiting && (
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
        {isScore && (
          <>
            <LuBookA size={100} />
            <h2>Verbal Memory</h2>
            <h1>{score} words</h1>
            <p>Press start to try again</p>
            <button onClick={handleReset}>Try Again</button>
          </>
        )}
      </GameArea>
      <Info>
        <p>
          This test measures how many words you can keep in short term memory at once. The number of words you need to
          remember grows continually, until you can't keep them in your head anymore. Go as long as you can. You have 3
          strikes until game over. Your score is how many turns you lasted.
        </p>
      </Info>
    </div>
  );
};

export default VerbalMemory;
