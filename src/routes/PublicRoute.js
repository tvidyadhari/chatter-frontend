import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  const { loggedInUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedInUser && restricted ? (
          <Redirect to="/timeline" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
