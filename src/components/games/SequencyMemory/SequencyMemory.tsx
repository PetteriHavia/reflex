import useGameScore from "../../../hooks/useGameScore";
import useStatusFlow from "../../../hooks/useStatusFlow";
import GameArea from "../../Layout/GameArea/GameArea";
import Initial from "../gamestatus/Initial";
import { LuTarget } from "react-icons/lu";
import styles from "./sequency-memory.module.css";
import { useEffect, useState } from "react";
import { wait } from "../../utils/wait";
import Info from "../../Layout/Info/Info";

const SequencyMemory = () => {
  const [active, setActive] = useState<number | null>(null);
  const [sequency, setSequency] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [showingPattern, setShowingPattern] = useState<boolean>(false);

  const { score, setScore, reset, incrementScore } = useGameScore(1);
  const { setStatus, isInitial, isWaiting, isScore } = useStatusFlow();

  useEffect(() => {
    if (isWaiting) {
      console.log("ACTIVE");
      setUserInput([]);
      setScore(1);
      wait(700).then(() => addToSequency());
    }
  }, [isWaiting]);

  useEffect(() => {
    if (isWaiting && sequency.length > 0) {
      wait(700).then(() => playSequnecy());
    }
  }, [sequency]);

  const handleReset = () => {
    setStatus("Initial");
    setSequency([]);
    setUserInput([]);
    reset();
  };

  const addToSequency = () => {
    const newStep = Math.floor(Math.random() * 9);
    setSequency([...sequency, newStep]);
  };

  const playSequnecy = async () => {
    setShowingPattern(true);
    for (let i = 0; i < sequency.length; i++) {
      setActive(sequency[i]);
      await wait(500);
      setActive(null);
      await wait(500);
    }
    setShowingPattern(false);
  };

  const handleSquarePress = (index: number) => {
    if (showingPattern) return;
    const nextInput = [...userInput, index];
    setUserInput(nextInput);
    setActive(index);

    wait(200).then(() => setActive(null));

    if (sequency[nextInput.length - 1] !== index) {
      setStatus("Score");
    }
    if (nextInput.length === sequency.length) {
      incrementScore();
      setUserInput([]);
      addToSequency();
      setTimeout(() => {
        playSequnecy();
      }, 500);
    }
  };

  return (
    <>
      <GameArea>
        {isInitial && (
          <Initial
            icon={<LuTarget size={100} />}
            title="Sequency Memory Test"
            desc="Memorize the pattern"
            setStatus={setStatus}
          />
        )}
        {isWaiting && (
          <>
            <h2>Level {score}</h2>
            <div className={styles.grid}>
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className={`${styles.square} ${active === index ? styles.isActive : ""}`}
                  onClick={() => handleSquarePress(index)}
                ></div>
              ))}
            </div>
          </>
        )}
        {isScore && (
          <>
            <LuTarget size={100} />
            <h2>Sequency Memory</h2>
            <h1>Level {score}</h1>
            <button onClick={handleReset}>Try Again</button>
          </>
        )}
      </GameArea>
      <Info>
        <p>
          Memorize the sequence of buttons that light up, then press them in order. Every time you finish the pattern,
          it gets longer. Make a mistake, and the test is over.
        </p>
      </Info>
    </>
  );
};

export default SequencyMemory;
