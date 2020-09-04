import React, { useContext } from "react";

import styles from "./Post.module.css";
import { UserContext } from "../../contexts/UserContext";

export default function Author({ name, username }) {
  const { loggedInUser } = useContext(UserContext);
  return (
    <span className={styles.author}>
      <span className={styles.name}>{name || loggedInUser.name}</span>
      <span className={styles.username}>
        @{username || loggedInUser.username}
      </span>
    </span>
  );
}
