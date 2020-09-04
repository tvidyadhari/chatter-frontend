import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Avatar({
  avatar: avatarTemp,
  loggedInAvatar,
  dimension,
}) {
  const { loggedInUser } = useContext(UserContext);
  const avatar = loggedInAvatar ? loggedInUser.avatar : avatarTemp;
  const px = dimension || 75;

  return (
    <>
      <img
        style={{
          display: "flex",
          alignItems: "center",
          objectFit: "cover",
          borderRadius: "50%",
        }}
        src={avatar || loggedInUser.avatar}
        alt="profile"
        width={px}
        height={px}
      />
    </>
  );
}
