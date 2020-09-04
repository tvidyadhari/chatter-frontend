import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Post from "../Post";
import Loader from "../Loader";
import CommentList from "./CommentList";

export default function Thread({ match }) {
  const { pid } = match.params;
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  function setComments(newComments) {
    const newPost = {
      ...response.post,
      comments: comments ? Object.keys(comments) : [],
    };
    setResponse({ ...response, comments: newComments, post: newPost });
  }

  useEffect(() => {
    (async function () {
      try {
        setResponse(await axios.get(`thread/${pid}`));
      } catch (err) {
        toast.error("Couldn't load the post");
      } finally {
        setLoading(false);
      }
    })();
  }, [pid, setLoading, setResponse]);

  if (loading) return <Loader />;
  if (!response) return <p>Post not found</p>;

  const { post, comments } = response;
  return (
    <div className="thread">
      <div>
        <Post post={post} commentCount={Object.keys(comments).length} />
      </div>
      <h5
        style={{ marginTop: "2em", marginBottom: ".75em", textAlign: "center" }}
      >
        Comments
      </h5>
      <CommentList comments={comments} pid={pid} setComments={setComments} />
    </div>
  );
}
