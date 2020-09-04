import React from "react";
import styles from "./Filter.module.css";
import { NavLink } from "react-router-dom";

export default function Filter() {
  return (
    <ul className={styles.filter}>
      <li>
        <NavLink activeClassName={styles.active} to="posts">
          posts
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName={styles.active} to="likes">
          likes
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName={styles.active} to="reposts">
          reposts
        </NavLink>
      </li>
    </ul>
  );
}
