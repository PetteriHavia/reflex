import React from "react";
import Grid from "../components/Grid/Grid";
import { BsFillLightningFill } from "react-icons/bs";

const Home = () => {
  return (
    <div>
      <div className="game-area">
        <div className="container column">
          <BsFillLightningFill size={100} color="white" />
          <h1>Human Benchmark Made With React</h1>
          <p>Measure your abilities with brain games and cognitive tests.</p>
          <button>Get Started</button>
        </div>
      </div>
      <Grid />
    </div>
  );
};

export default Home;
