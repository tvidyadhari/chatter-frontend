import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.render(
  <>
    <App />
    <ToastContainer
      transition={Slide}
      position="top-center"
      autoClose={2000}
      hideProgressBar
      closeButton={false}
    />
  </>,
  document.getElementById("root")
);
