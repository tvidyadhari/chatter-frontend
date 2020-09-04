import React, { useContext, useState } from "react";
import { ReactComponent as DeleteIcon } from "./images/bin.svg";
import { PostContext } from "../../contexts/PostContext";
import axios from "axios";
import { toast } from "react-toastify";
import { button } from "./Post.module.css";
import { useHistory } from "react-router-dom";

export default function Delete({ pid, isOwnPost }) {
  const [deleting, setDeleting] = useState(false);
  const { posts, setPosts } = useContext(PostContext);
  const history = useHistory();

  async function handleClick() {
    if (deleting) return;
    let successful = true;
    try {
      setDeleting(true);
      const newPosts = { ...posts };
      delete newPosts[pid];
      setPosts(newPosts);
      await axios.delete(`post/${pid}`);
      if (window.location.pathname.includes("thread")) return history.goBack();
    } catch (err) {
      successful = false;
      toast.error(err.message);
    } finally {
      setDeleting(false);
      if (successful) toast.info("Post Deleted");
    }
  }

  return (
    <>
      {isOwnPost ? (
        <DeleteIcon className={button} onClick={handleClick} />
      ) : null}
    </>
  );
}
