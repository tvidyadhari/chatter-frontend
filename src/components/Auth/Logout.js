import React, { useEffect } from "react";
import { logout } from "../../api/auth";
import Loader from "../Loader";

function Logout() {
  useEffect(() => {
    (async function () {
      try {
        await logout();
      } catch (err) {
        console.info("logout error");
      } finally {
        window.location = "/login";
      }
    })();
  }, []);
  return <Loader />;
}

export default Logout;
