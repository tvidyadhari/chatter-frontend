import React, { useContext } from "react";
import Avatar from "../Post/Avatar";
import Author from "../Post/Author";
import Time from "../Post/Time";
import styles from "./Thread.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function Comment({ comment }) {
  const { loggedInUser } = useContext(UserContext);
  const { commented_by } = comment;
  return (
    <div className={styles.comment}>
      <div className={styles["user-info"]}>
        <Link to={`/${commented_by.username || loggedInUser.username}/posts`}>
          <Avatar
            className={styles.avatar}
            avatar={commented_by.avatar}
            dimension={50}
          />
        </Link>
        <Author username={commented_by.username} name={commented_by.name} />
        <Time time={comment.createdAt} />
      </div>
      <p className={styles.text}>{comment.text}</p>
    </div>
  );
}
