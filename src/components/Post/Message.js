import React from "react";
import styles from "./Post.module.css";

export default function Message({ message, image }) {
  return (
    <>
      {message && <div className={styles.message}>{message}</div>}
      {image && (
        <img src={image} className={styles["uploaded-img"]} alt="uploaded" />
      )}
    </>
  );
}
