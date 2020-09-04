import React, { useContext } from "react";
import { ReactComponent as HeartFillIcon } from "./images/heart-fill.svg";
import { ReactComponent as HeartIcon } from "./images/heart.svg";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import axios from "axios";
import { button, liked } from "./Post.module.css";

export default function LikeButton({ pid, uid, isOwnPost }) {
  const { posts, setPosts, profile } = useContext(PostContext);
  let likes = posts && posts[pid] ? [...posts[pid].likes] : [];
  const isLiked = new Set(likes).has(uid);

  async function handleClick() {
    if (isOwnPost) return toast.error("You can't like your own post");

    try {
      if (isLiked) {
        // remove like
        likes = likes.filter((id) => id !== uid);
      } else {
        // add like
        likes.push(uid);
      }
      if (
        isLiked &&
        profile &&
        profile._id === uid &&
        !window.location.pathname.includes("reposts")
      ) {
        const { [pid]: remove, ...rest } = posts;
        setPosts({ ...rest });
      } else setPosts({ ...posts, [pid]: { ...posts[pid], likes } });

      await axios.post(`/like/${pid}`);
    } catch (err) {
      toast(err.message);
    }
  }
  const count = likes.length;

  const Component = isLiked ? HeartFillIcon : HeartIcon;
  return (
    <div className={button}>
      <Component
        onClick={handleClick}
        className={isLiked ? liked : null}
      ></Component>
      <span>{count || null}</span>
    </div>
  );
}
