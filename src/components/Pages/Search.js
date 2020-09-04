import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Pages.module.css";
import Loader from "../Loader";

export default function Search() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // using debounce function to delay search
    const delayDebounceFn = setTimeout(() => {
      (async function () {
        try {
          if (!query.trim().length) return setUsers(null);
          setLoading(true);
          const { users: result } = await axios.get("/search", {
            params: { q: query },
          });
          setUsers(result);
        } catch (err) {
          console.error(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  function handleChange(e) {
    setQuery(e.target.value);
  }

  const component =
    users && users.length ? (
      users.map((user) => (
        <div className={styles["search-item"]} key={user._id}>
          <Link to={`/${user.username}/posts`}>
            <div className={styles["user-card"]}>
              <img
                style={{
                  display: "flex",
                  alignItems: "center",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={user.avatar}
                alt="profile"
                width="75"
                height="75"
              />
              <div className={styles["all-info"]}>
                <div className={styles["user-info"]}>
                  <p>{user.name || "hello"}</p>
                  <span>@{user.username}</span>
                </div>
                <div className={styles["user-meta"]}>
                  <div>
                    <span className="following">
                      <span className={styles.value}>
                        {user.following.length}
                      </span>
                      <span className={styles.key}>Following</span>
                    </span>
                    <span className="followers">
                      <span className={styles.value}>
                        {user.followers.length}
                      </span>
                      <span className={styles.key}>
                        {user.followers.length === 1 ? "Follower" : "Followers"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))
    ) : (
      <p className={styles.message}>no users found.</p>
    );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="🔍 search"
        className={styles.search}
      />
      {query ? (
        <div className={styles["search-result"]}>
          {loading ? <Loader /> : component}
        </div>
      ) : null}
    </div>
  );
}
