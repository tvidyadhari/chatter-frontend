import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import styles from "./Suggestions.module.css";

export default function Suggestions() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const { users } = await axios.get("/suggestions");
        setUsers(users);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [setUsers]);

  const suggestions = users.length ? (
    <>
      <p className={styles.heading}>Check out these users</p>
      {users.map((user) => (
        <div className={styles["suggestions-item"]} key={user._id}>
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
      ))}
    </>
  ) : null;

  return (
    <div className={styles.suggestions}>
      {loading ? <Loader /> : suggestions}
    </div>
  );
}
