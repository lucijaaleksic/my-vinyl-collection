import React, { useState } from "react";
import { Avatar, Paper } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useHistory } from "react-router-dom";

function FriendListItem({ userData, username }) {
  const history = useHistory();

  const paperStyle = {
    width: "100%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid gray",
    cursor: "pointer",
  };

  const avatarStyle = {
    height: "55px",
    width: "55px",
  };

  const handleClick = () => {
    history.push(`/dashboard/users/${username}`);
  };
  return (
    <div onClick={handleClick}>
      <div
        style={paperStyle}
        // onMouseOver={hover} onMouseOut={unhover} elevation={10}
      >
        <div style={{ display: "flex", margin: "10px" }}>
          <Avatar style={avatarStyle}></Avatar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "start",
              marginLeft: "1rem",
            }}
          >
            {userData == null ? (
              <h2 style={{ margin: "auto", fontWeight: 500 }}>{username}</h2>
            ) : (
              <>
                <h2 style={{ margin: 0, fontWeight: 600 }}>
                  {userData.username}
                </h2>
                <h4 style={{ margin: 0, fontWeight: 400 }}>
                  {userData.name} {userData.surname}
                </h4>
              </>
            )}
          </div>
        </div>
        <ArrowForwardIosIcon
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            marginRight: "1rem",
          }}
        />
      </div>
    </div>
  );
}

export default FriendListItem;
