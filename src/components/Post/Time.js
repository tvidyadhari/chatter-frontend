import React from "react";
import moment from "moment";
import { time as timeStyle } from "./Post.module.css";

export default function Time({ time }) {
  return <span className={timeStyle}>{moment(time).fromNow()}</span>;
}
