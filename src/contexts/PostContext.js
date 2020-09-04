import React, { createContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  // initial state
  const [posts, setPosts] = useState(null);
  const [profile, setProfile] = useState(null);
  const [filter, setFilter] = useState("posts");

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        profile,
        setProfile,
        filter,
        setFilter,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
