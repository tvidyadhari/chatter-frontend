import React, { createContext, useEffect, useState } from "react";
import { getLoggedInUser } from "../api/users";
import Loader from "../components/Loader";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // initial state
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [following, setFollowing] = useState(null);
  const [loading, setLoading] = useState(true);

  // get current user details
  useEffect(() => {
    console.log("je;;p");
    (async function () {
      try {
        const { user, following } = await getLoggedInUser();
        setLoggedInUser(user);
        setFollowing(following);
      } catch (error) {
        console.log("unable to fetch user");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        following,
        setFollowing,
      }}
    >
      {loading ? <Loader /> : children}
    </UserContext.Provider>
  );
}
