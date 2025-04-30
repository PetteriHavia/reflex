import { ReactNode } from "react";
import styles from "./info.module.css";

type Props = {
  children: ReactNode;
};

const Info = ({ children }: Props) => {
  return (
    <section className={`container ${styles.wrapper}`}>
      <h2>About The Test</h2>
      {children}
    </section>
  );
};

export default Info;
