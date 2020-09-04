import React, { useContext } from "react";
import { ReactComponent as ReplyIcon } from "./images/reply.svg";
import { button, commented } from "./Post.module.css";
import { PostContext } from "../../contexts/PostContext";
import { Link } from "react-router-dom";

export default function ReplyButton({ pid, uid, commentCount }) {
  const { posts } = useContext(PostContext);
  let comments = posts && posts[pid] ? [...posts[pid].comments] : [];
  const hasCommented = new Set(comments).has(uid);

  const count = commentCount || comments.length;

  return (
    <Link to={`/thread/${pid}`} className={button}>
      <ReplyIcon className={hasCommented ? commented : null} />
      <span>{count || null}</span>
    </Link>
  );
}
// TODO: combine like + repost and don't remove a post if it is either liked by you or reposted by you remove only is both are false
