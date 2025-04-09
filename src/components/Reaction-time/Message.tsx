import { ReactNode } from "react";
import styles from "./reaction-time.module.css";

type Props = {
  msg?: { text: string; icon?: ReactNode };
};

const Message = ({ msg }: Props) => {
  return (
    <>
      {msg ? (
        <div className={styles.message}>
          <div className={styles.icon}>{msg.icon}</div>
          <h1>{msg.text}</h1>
        </div>
      ) : null}
    </>
  );
};

export default Message;
