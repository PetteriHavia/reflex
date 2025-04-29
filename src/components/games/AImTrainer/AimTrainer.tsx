import { useState, useEffect, useRef } from "react";
import useGameScore from "../../../hooks/useGameScore";
import useStatusFlow from "../../../hooks/useStatusFlow";
import GameArea from "../../Layout/GameArea";
import Initial from "../gamestatus/Initial";
import { LuTarget } from "react-icons/lu";
import styles from "./aim-trainer.module.css";

type Coords = {
  x: number;
  y: number;
};

const AimTrainer = () => {
  const [target, setTarget] = useState<Coords | null>(null);
  const [times, setTimes] = useState<number[]>([]);
  const [timeNow, setTimeNow] = useState<number | null>(null);

  const { isInitial, isWaiting, isScore, setStatus } = useStatusFlow();
  const { lives, decrementLives, reset } = useGameScore(0, 30);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isWaiting) {
      setTimes([]);
      initializeTarget();
      setTimeNow(Date.now());
    }
  }, [isWaiting]);

  const initializeTarget = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const newTarget = {
      x: Math.floor(Math.random() * (width - 100)),
      y: Math.floor(Math.random() * (height - 100)),
    };
    setTarget(newTarget);
  };

  const handleReset = () => {
    reset();
    setStatus("Initial");
    setTimeNow(null);
  };

  const timeAverage = () => {
    if (times.length === 0) return 0;
    const average = times.reduce((acc, cur) => acc + cur) / times.length;
    return Math.round(average);
  };

  const handleClick = () => {
    if (lives && lives <= 1) {
      setStatus("Score");
      setTarget(null);
      return;
    }
    if (timeNow !== null) {
      const getTime = Date.now() - timeNow;
      setTimes([...times, getTime]);
    }
    initializeTarget();
    setTimeNow(Date.now());
    decrementLives();
  };

  return (
    <GameArea>
      {isInitial && (
        <Initial
          icon={<LuTarget size={100} />}
          title="Aim Trainer"
          desc="Hit 30 targets as quickly as you can. Click the target above to begin"
          setStatus={setStatus}
        />
      )}
      {isWaiting && (
        <>
          <span>
            Remaining <span>{lives}</span>
          </span>
          <div ref={containerRef} className={styles.targetContainer} style={{ maxWidth: "600px", maxHeight: "400px" }}>
            <LuTarget
              size={100}
              className={styles.target}
              style={{ top: target ? `${target.y}px` : "0px", left: target ? `${target.x}px` : "0px" }}
              onClick={handleClick}
            />
          </div>
        </>
      )}
      {isScore && (
        <>
          <LuTarget size={100} />
          <h2>Average time per target</h2>
          <h1>{timeAverage()} ms</h1>
          <button onClick={handleReset}>Try Again</button>
        </>
      )}
    </GameArea>
  );
};

export default AimTrainer;
