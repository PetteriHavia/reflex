import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import "./styles/global-styles.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reaction-time" element={<p>test</p>} />
      </Routes>
    </>
  );
}

export default App;
