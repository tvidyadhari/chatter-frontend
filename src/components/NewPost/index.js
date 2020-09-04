import React, { useState, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./NewPost.module.css";
import { PostContext } from "../../contexts/PostContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ReactComponent as Image } from "./images/image.svg";
import uploadImage from "../../api/upload";

export default function NewPost() {
  const { posts, setPosts } = useContext(PostContext);
  const [message, setMessage] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [posting, setPosting] = useState(false);
  function handleChange(e) {
    setMessage(e.target.value);
  }

  async function handleUpload(e) {
    const [file] = e.target.files;
    // validate
    if (!file) return;
    if (!file.type.includes("image"))
      return toast.error("File type not supported");
    try {
      setUploadingImg(true);
      setImgUrl(await uploadImage(file));
    } catch (err) {
      toast.error("Couldn't upload image");
    } finally {
      setUploadingImg(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault(); // to stop reloading
    if (!message.trim().length && !imgUrl.length) return;
    if (message.length > 280) return toast.error("Only 280 characters allowed");
    setPosting(true);
    try {
      const newPost = await axios.post("post", {
        text: message,
        image: imgUrl,
      });
      const pid = Object.keys(newPost)[0];
      const newPosts = { ...posts };
      newPosts[pid] = newPost[pid];
      setPosts(newPosts);
      setMessage("");
      setImgUrl("");
      return toast.info("Posted!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className={styles["new-post"]}>
      <TextareaAutosize
        spellCheck="false"
        className={styles.textarea}
        cols="48"
        placeholder="What's happening?"
        type="text"
        value={message}
        onChange={handleChange}
      />
      {imgUrl && (
        <img className={styles["uploaded-img"]} src={imgUrl} alt="uploaded" />
      )}
      <div className={styles.actions}>
        <label>
          <input
            style={{ display: "none" }}
            name="file"
            type="file"
            onChange={handleUpload}
            disabled={uploadingImg}
          />
          <Image className={styles.image} title="upload image" />
        </label>
        <button
          className={`btn ${styles["new-post-btn"]}`}
          type="submit"
          onClick={handleSubmit}
          disabled={posting}
        >
          Post
        </button>
      </div>
    </div>
  );
}
