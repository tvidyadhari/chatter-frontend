import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./Thread.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import Comment from "./Comment";

export default function CommentList({ comments, setComments, pid }) {
  const [comment, setComment] = useState("");
  const noComments = Object.keys(comments || {}).length === 0;

  function handleChange(e) {
    setComment(e.target.value);
  }

  // descending order
  const commentIds = Object.keys(comments).sort((a, b) => {
    return (
      new Date(comments[b].createdAt).getTime() -
      new Date(comments[a].createdAt).getTime()
    );
  });

  async function handleSubmit(e) {
    e.preventDefault(); // to stop reloading
    if (!comment.trim().length) return;
    try {
      const { comment: newComment } = await axios.post("comment", {
        pid,
        comment,
      });
      const cid = newComment._id;
      setComments({ ...comments, [cid]: newComment });
      // return toast.info("Comment posted");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <div className={styles["new-comment"]}>
        <TextareaAutosize
          spellCheck="false"
          className={styles.textarea}
          cols="48"
          placeholder="Enter your reply"
          type="text"
          value={comment}
          onChange={handleChange}
        />
        <button
          className={`btn ${styles["add-btn"]}`}
          type="submit"
          onClick={handleSubmit}
        >
          Reply
        </button>
      </div>

      <div className={styles["comment-list"]}>
        {noComments ? (
          <p className={styles.message}>no comments to display</p>
        ) : (
          commentIds.map((pid) => {
            return <Comment key={pid} comment={comments[pid]} />;
          })
        )}
      </div>
    </>
  );
}
