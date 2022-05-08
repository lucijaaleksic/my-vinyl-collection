import React from "react";

import { Avatar } from "@mui/material";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../util/utils";

const userContainerStyle = {
  display: "flex",
  background: "#d59a88",
  borderBottomLeftRadius: "1rem",
  borderTopLeftRadius: "1rem",
  margin: "0.8rem",
  marginRight: "0rem",
  padding: "0.5rem",
  alignItems: "center",
  cursor: "pointer",
};
const avatarStyle = { height: 56, width: 56, fontSize: 25 };
const usernameStyle = { fontSize: "1.2rem", marginLeft: "1rem" };

function UserTab() {
  const history = useHistory();
  const username = getCurrentUser();
  const isAdmin =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_ADMIN");

  if (username != null) {
    return (
      <div
        style={userContainerStyle}
        onClick={() => {
          if (!isAdmin) history.push("/dashboard/profile");
        }}
      >
        <Avatar alt="user" sx={avatarStyle}>
          {username.substring(0, 1).toUpperCase()}
        </Avatar>
        <h4 style={usernameStyle}>{username}</h4>
      </div>
    );
  } else {
    return (
      <div style={userContainerStyle}>
        <Avatar alt="user" sx={avatarStyle}>
          G
        </Avatar>
        <h4 style={usernameStyle}>Guest</h4>
      </div>
    );
  }
}

export default UserTab;
