import { GameInfo } from "../../types";
import Card from "./Card";
import styles from "./grid.module.css";
import { LuTarget } from "react-icons/lu";
import { BsFillLightningFill } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { LuBookA } from "react-icons/lu";
import { LuKeyboard } from "react-icons/lu";
import { HiOutlineSquaresPlus } from "react-icons/hi2";

const Grid = () => {
  const gameInfo: GameInfo[] = [
    {
      id: 1,
      label: "Reaction Time",
      link: "/reaction-time",
      content: "Test your visual reflexes",
      icon: <BsFillLightningFill />,
    },
    {
      id: 2,
      label: "Sequence Memory",
      link: "/sequence-memory",
      content: "Remember an increasingly long pattern of button presses.",
      icon: <HiOutlineSquaresPlus />,
    },
    {
      id: 3,
      label: "Aim Trainer",
      link: "/aim-trainer",
      content: "How quickly can you hit all the targets?",
      icon: <LuTarget />,
    },
    {
      id: 4,
      label: "Number Memory",
      link: "/number-memory",
      content: "Remember the longest number you can.",
      icon: <TbNumbers />,
    },
    {
      id: 5,
      label: "Verbal Memory",
      link: "/verbal-memory",
      content: "Keep as many words in short term memory as possible.",
      icon: <LuBookA />,
    },
    {
      id: 6,
      label: "Chimp Test",
      link: "/chimp-test",
      content: "Are you smarter than a chimpanzee?",
      icon: <HiOutlineSquaresPlus />,
    },
    {
      id: 7,
      label: "Visual Memory",
      link: "/visual-memory",
      content: "Remember an increasingly large board of squares.",
      icon: <HiOutlineSquaresPlus />,
    },
    {
      id: 8,
      label: "Typing",
      link: "/typing",
      content: "How many words per minute can you type?",
      icon: <LuKeyboard />,
    },
  ];

  return (
    <div className="container">
      <div className={styles.gridContainer}>
        {gameInfo.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
