import React, { useState, useEffect, useContext } from "react";
import NewPost from "../NewPost";
import PostList from "../PostList";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader";
import styles from "./Pages.module.css";
import { PostContext } from "../../contexts/PostContext";

export default function Timeline() {
  const { setPosts } = useContext(PostContext);
  const [loading, setLoading] = useState(true);

  // get timeline
  useEffect(() => {
    (async function () {
      try {
        const { posts } = await axios.get("/timeline");
        setPosts(posts);
      } catch (error) {
        toast.error("Unable to fetch timeline");
      } finally {
        setLoading(false);
      }
    })();
  }, [setPosts]);

  return (
    <div className={` ${styles.home}`}>
      <h1 style={{ marginBottom: ".5em" }}>Home</h1>
      <NewPost />
      {loading ? <Loader /> : <PostList display="posts" />}
    </div>
  );
}
