import { GameStatus } from "../types";
import { useState } from "react";

const useStatusFlow = (InitialState: GameStatus = "Initial") => {
  const [status, setStatus] = useState<GameStatus>(InitialState);

  const isInitial = status === "Initial";
  const isTooFast = status === "TooFast";
  const isWaiting = status === "Waiting";
  const isEnd = status === "End";
  const isScore = status === "Score";

  return {
    status,
    setStatus,
    isInitial,
    isTooFast,
    isWaiting,
    isEnd,
    isScore,
  };
};

export default useStatusFlow;
