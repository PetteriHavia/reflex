import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import "./styles/global-styles.css";
import Navbar from "./components/Navbar/Navbar";
import ReactionTime from "./components/Reaction-time/ReactionTime";
import NumberMemory from "./components/games/NumberMemory/NumberMemory";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reaction-time" element={<ReactionTime />} />
        <Route path="/number-memory" element={<NumberMemory />} />
      </Routes>
    </>
  );
}

export default App;
