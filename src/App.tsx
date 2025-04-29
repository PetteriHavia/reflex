import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import "./styles/global-styles.css";
import Navbar from "./components/Navbar/Navbar";
import ReactionTime from "./components/Reaction-time/ReactionTime";
import NumberMemory from "./components/games/NumberMemory/NumberMemory";
import VerbalMemory from "./components/games/VerbalMemory/VerbalMemory";
import SequencyMemory from "./components/games/SequencyMemory/SequencyMemory";
import VisualMemory from "./components/games/VisualMemory/VisualMemory";
import AimTrainer from "./components/games/AImTrainer/AimTrainer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reaction-time" element={<ReactionTime />} />
        <Route path="/number-memory" element={<NumberMemory />} />
        <Route path="/verbal-memory" element={<VerbalMemory />} />
        <Route path="/sequence-memory" element={<SequencyMemory />} />
        <Route path="/visual-memory" element={<VisualMemory />} />
        <Route path="/aim-trainer" element={<AimTrainer />} />
      </Routes>
    </>
  );
}

export default App;
