import Grid from "../components/Grid/Grid";
import { BsFillLightningFill } from "react-icons/bs";
import { Link } from "react-router";
import GameArea from "../components/Layout/GameArea";

const Home = () => {
  return (
    <div>
      <GameArea>
        <BsFillLightningFill size={100} color="white" />
        <h1>Human BeanchMark Made With React</h1>
        <p>Measure your abilities with brain games and cognitive tests</p>
        <Link to="/reaction-time">
          <button>Get Started</button>
        </Link>
      </GameArea>
      <Grid />
    </div>
  );
};

export default Home;
