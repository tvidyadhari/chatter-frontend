import React, { useContext } from "react";
import Avatar from "./Avatar";
import Author from "./Author";
import Time from "./Time";
import Message from "./Message";
import ReplyButton from "./ReplyButton";
import RepostButton from "./RepostButton";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import styles from "./Post.module.css";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Post({ post, commentCount }) {
  const { following, loggedInUser } = useContext(UserContext);
  const { posted_by: postedBy } = post;
  const { _id: pid } = post;
  const { _id: uid } = loggedInUser;
  const isOwnPost = loggedInUser._id === (postedBy._id || postedBy);
  const commonProps = { pid, uid, isOwnPost };

  // post info
  const { likedInfo, repostedInfo } = getPostInfo({
    uid,
    following,
    likes: post.likes,
    reposts: post.reposts,
  });

  // return post
  return (
    <div className={styles.post}>
      <span className={styles.info}>{likedInfo}</span>
      <span className={styles.info}>{repostedInfo}</span>
      <div className={styles["user-info"]}>
        <Link to={`/${postedBy.username || loggedInUser.username}/posts`}>
          <Avatar avatar={postedBy.avatar} loggedInAvatar={isOwnPost} />
        </Link>
        <Author
          username={postedBy.username || loggedInUser.username}
          name={postedBy.name || loggedInUser.name}
        />
        <Time time={post.createdAt} />
      </div>
      <Link to={`/thread/${pid}`}>
        <Message message={post.text} image={post.image} />
      </Link>
      <div className={styles.buttons}>
        <ReplyButton
          {...commonProps}
          className={styles.button}
          commentCount={commentCount}
        />
        <RepostButton {...commonProps} className={styles.button} />
        <LikeButton {...commonProps} className={styles.button} />
        <DeleteButton {...commonProps} />
      </div>
    </div>
  );
}

// get post info
function getPostInfo({ following, likes, reposts, uid }) {
  let likedInfo = null;
  let repostedInfo = null;
  const isLiked = [...Object.keys(following), uid].filter((e) =>
    likes.includes(e)
  );
  if (isLiked.length) {
    const username =
      isLiked[0] === uid ? "you" : following[isLiked[0]].username;

    likedInfo = `liked by ${username} ${
      isLiked.length > 1 ? "and others" : ""
    }`;
  }
  const isReposted = [...Object.keys(following), uid].filter((e) =>
    reposts.includes(e)
  );
  if (isReposted.length) {
    const username =
      isReposted[0] === uid ? "you" : following[isReposted[0]].username;
    repostedInfo = `reposted by ${username} ${
      isReposted.length > 1 ? "and others" : ""
    }`;
  }
  return { likedInfo, repostedInfo };
}
