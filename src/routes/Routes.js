import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { PostProvider } from "../contexts/PostContext";

// route components imports
import PageNotFound from "../components/404";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Homepage from "../components/Homepage";
import Logout from "../components/Auth/Logout";
import Nav from "../components/Nav";
import Suggestions from "../components/Suggestions";
import Thread from "../components/Thread";
import Search from "../components/Pages/Search";
import Profile from "../components/Profile";
import Timeline from "../components/Pages/Timeline";

// styles
import { layout } from "../components/Pages/Pages.module.css";

function Layout({ children }) {
  return (
    <PostProvider>
      <PrivateRoute component={Nav} />
      <div className={layout}>
        {children}
        <PrivateRoute component={Suggestions} />
      </div>
    </PostProvider>
  );
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/" exact restricted component={Homepage} />
        <PublicRoute path="/login" exact restricted component={Login} />
        <PublicRoute path="/signup" exact restricted component={Signup} />
        <PublicRoute path="/logout" exact component={Logout} />

        <Layout>
          <Switch>
            <PrivateRoute path="/search" exact component={Search} />
            <PrivateRoute path="/timeline" exact component={Timeline} />
            <PrivateRoute path="/thread/:pid" exact component={Thread} />
            <PrivateRoute path="/:username/posts" exact component={Profile} />
            <PrivateRoute path="/:username/likes" exact component={Profile} />
            <PrivateRoute path="/:username/reposts" exact component={Profile} />
            <Route component={PageNotFound} />
          </Switch>
        </Layout>

        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}
