import { Link } from "react-router";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <Link className={styles.link} to="/">
          HOME
        </Link>
        <Link className={styles.link} to="/">
          DASHBOARD
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
