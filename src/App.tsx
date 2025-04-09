import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import "./styles/global-styles.css";
import Navbar from "./components/Navbar/Navbar";
import ReactionTime from "./components/Reaction-time/ReactionTime";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reaction-time" element={<ReactionTime />} />
      </Routes>
    </>
  );
}

export default App;
