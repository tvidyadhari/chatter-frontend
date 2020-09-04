import React, { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import Post from "../Post";
import styles from "./PostList.module.css";

export default function PostList({ comments }) {
  const { posts } = useContext(PostContext);
  const noPosts = Object.keys(posts).length === 0;
  const postIds = Object.keys(posts).sort((a, b) => {
    return (
      new Date(posts[b].createdAt).getTime() -
      new Date(posts[a].createdAt).getTime()
    );
  });
  return (
    <div className={styles["post-list"]}>
      {noPosts ? (
        <p className={styles.message}>no posts to display</p>
      ) : (
        postIds.map((pid) => {
          return <Post key={pid} post={posts[pid]} />;
        })
      )}
    </div>
  );
}
