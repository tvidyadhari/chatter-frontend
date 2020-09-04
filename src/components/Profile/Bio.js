import React, { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import styles from "./Bio.module.css";
import { toast } from "react-toastify";
import uploadImage from "../../api/upload";

export default function Bio() {
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const { profile, setProfile } = useContext(PostContext);
  const { loggedInUser, setLoggedInUser, following: luF } = useContext(
    UserContext
  );
  const [isFollowing, setIsFollowing] = useState(profile._id in luF);

  const isCurrentUser = loggedInUser._id === profile._id;

  async function toggleFollow() {
    try {
      const { _id: uid } = loggedInUser;
      const { _id: xid } = profile;
      await axios.post("follow", { xid });
      let followers = [...profile.followers];
      let following = [...loggedInUser.following];
      if (isFollowing) {
        followers = followers.filter((id) => id !== uid);
        following = following.filter((id) => id !== xid);
        setIsFollowing(false);
      } else {
        followers = [...followers, uid];
        following = [...following, xid];
        setIsFollowing(true);
      }
      // update followers
      setProfile({ ...profile, followers });
      // update following
      setLoggedInUser({
        ...loggedInUser,
        following,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleUpload(e) {
    const [file] = e.target.files;
    // validate
    if (!file) return;
    if (!file.type.includes("image")) toast.error("File type not supported");
    try {
      setUploadingImg(true);
      const uploadedUrl = await uploadImage(file);
      setImgUrl(uploadedUrl);
      await axios.post("upload", { url: uploadedUrl });
      setLoggedInUser({ ...loggedInUser, avatar: uploadedUrl });
    } catch (err) {
      toast.error("Couldn't upload image");
    } finally {
      setUploadingImg(false);
    }
  }
  const btnValue = isFollowing ? "Unfollow" : "Follow";
  return (
    <div className={styles.bio}>
      <div className={styles["user-info"]}>
        <label>
          <input
            style={{ display: "none" }}
            name="file"
            type="file"
            onChange={handleUpload}
            disabled={!isCurrentUser || uploadingImg}
          />

          <img
            style={{
              display: "flex",
              alignItems: "center",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={imgUrl || profile.avatar}
            alt="profile"
            width="100"
            height="100"
          />
        </label>

        <div className={styles.author}>
          <p className={styles.name}>{profile.name || "placeholder"}</p>
          <span className={styles.username}>@{profile.username}</span>
        </div>
      </div>
      <div className={styles["user-meta"]}>
        <div>
          <span className="following">
            <span className={styles.value}>{profile.following.length}</span>
            <span className={styles.key}>Following</span>
          </span>
          <span className="followers">
            <span className={styles.value}>{profile.followers.length}</span>
            <span className={styles.key}>
              {profile.followers.length === 1 ? "Follower" : "Followers"}
            </span>
          </span>
        </div>

        {isCurrentUser || (
          <button className={`btn ${styles[btnValue]}`} onClick={toggleFollow}>
            {btnValue}
          </button>
        )}
      </div>
    </div>
  );
}
