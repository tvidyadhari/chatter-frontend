import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { PostContext } from "../../contexts/PostContext";
import Bio from "./Bio";
import Filter from "./Filter";
import PostList from "../PostList";

export default function Profile({ match }) {
  const { username } = match.params;
  const action = match.path.split("/")[2];
  const { setProfile, setPosts, setFilter } = useContext(PostContext);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  // clear profile + filter on unmount
  useEffect(
    () => () => {
      setProfile(null);
      setPosts({});
      setFilter("posts");
    },
    [setProfile, setFilter, setPosts]
  );

  // get profile
  useEffect(() => {
    (async function () {
      try {
        const { posts, user } = await axios.get(`/${username}/${action}`);
        setPosts(posts);
        setProfile(user);
      } catch (error) {
        setFailed(true);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [setProfile, username, setPosts, action]);

  return (
    <div className="profile" style={{ position: "relative" }}>
      <h3 style={{ marginBottom: ".5em" }}>{username}</h3>
      {/* <Filter /> */}

      {loading ? (
        <Loader />
      ) : failed ? (
        <p>User not found</p>
      ) : (
        <>
          <Bio />
          <Filter username={username} />
          <PostList />
        </>
      )}
    </div>
  );
}
