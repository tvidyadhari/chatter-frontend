import React, { useContext } from "react";
import { ReactComponent as RepostIcon } from "./images/repost.svg";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import axios from "axios";
import { button, reposted } from "./Post.module.css";

export default function RepostButton({ pid, uid, isOwnPost }) {
  const { posts, setPosts, profile } = useContext(PostContext);
  let reposts = posts && posts[pid] ? [...posts[pid].reposts] : [];
  const isReposted = new Set(reposts).has(uid);

  async function handleClick() {
    if (isOwnPost) return toast.error("You can't repost your own post");

    try {
      if (isReposted) {
        reposts = reposts.filter((id) => id !== uid);
      } else {
        reposts.push(uid);
      }
      // if own profile, remove the post
      if (
        isReposted &&
        profile &&
        profile._id === uid &&
        !window.location.pathname.includes("likes")
      ) {
        const { [pid]: remove, ...rest } = posts;
        setPosts({ ...rest });
      } else setPosts({ ...posts, [pid]: { ...posts[pid], reposts } });
      await axios.post(`/repost/${pid}`);
    } catch (err) {
      toast(err.message);
    }
  }

  return (
    <div className={button}>
      <RepostIcon
        onClick={handleClick}
        className={`button ${isReposted ? reposted : null}`}
      />
      <span>{reposts.length || ""}</span>
    </div>
  );
}
