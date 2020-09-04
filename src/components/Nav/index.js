import React, { useContext } from "react";
import { ReactComponent as HomeIcon } from "./images/home.svg";
import { ReactComponent as ProfileIcon } from "./images/profile.svg";
import { ReactComponent as SearchIcon } from "./images/search.svg";
import Icon from "./images/icon.png";

import { ReactComponent as LogoutIcon } from "./images/logout.svg";

import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function Nav() {
  const { loggedInUser } = useContext(UserContext);
  const { username } = loggedInUser;
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink exact to="/timeline">
            <img src={Icon} className={styles.icon} alt="logo" />
            <span className={styles.title}>Chatter</span>
          </NavLink>
        </li>

        <li>
          <NavLink exact activeClassName={styles.active} to="/timeline">
            <HomeIcon /> <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeClassName={styles.active}
            to={`/${username}/posts`}
          >
            <ProfileIcon /> <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName={styles.active} to="/search">
            <SearchIcon /> <span>Search</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink exact activeClassName={styles.active} to="/help">
            <AddIcon /> <span>Post</span>
          </NavLink>
        </li> */}
        <li>
          <NavLink exact activeClassName={styles.active} to="/logout">
            <LogoutIcon />
            <span className={`${styles["logout-btn"]}`}>Logout</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
