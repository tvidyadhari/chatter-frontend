import React from "react";
import homepageImage from "./homepage.svg";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className={styles.homepage}>
      {/* <Link to="/login">
        <button className={`btn btn-outline ${styles.login}`}>Login</button>
      </Link> */}
      <div>
        <h1 className={styles.title}>
          Join the <br /> conversation.
        </h1>
        <div className={styles.desc}>
          <p>Follow the people you like</p>
          <p>Share your thoughts</p>
          <p>Start using chatter today.</p>
        </div>
        <Link to="/signup">
          <button className={`btn ${styles.btn}`}>Create an account</button>
        </Link>
        <Link to="/login">
          <button className={`btn btn-outline ${styles.login}`}>Login</button>
        </Link>
      </div>

      <img
        src={homepageImage}
        className={styles.image}
        alt="a girl texting her friends"
      />
    </div>
  );
}
