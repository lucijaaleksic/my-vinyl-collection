import React, {useEffect, useState} from "react";

import { Avatar, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import {IsMobile} from "../util/utils";
import authHeader from "../auth-header";

const headerStyleDesktop = {
  background: "#d59a88",
  margin: "2rem",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
};
const headerStyleMobile = {
  background: "#d59a88",
  width: "90%",
  margin: "auto",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
};
const avatarStyleDesktop = {
  width: "150px",
  height: "150px",
  fontSize: "75px",
};
const avatarStyleMobile = {
  width: "75px",
  height: "75px",
  fontSize: "30px",
};

function ProfileHeader({username}) {
  const api = process.env.REACT_APP_API_URL;
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    fetch(api + "/users/friends", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin
      }
    })
      .then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then(data => {
        console.log(JSON.stringify(data, null, 2));
        setFollowing(data.map(u => u.username).includes(username));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const toggleFollow = () => {
    fetch(api + `/users/friends/${username}`, {
      method: "PUT",
      headers: {
        Authorization: authHeader(),
        Origin: origin
      },
      body: {}
    })
      .then(response => {
        console.log(JSON.stringify(response, null, 2));
        if(response.ok){
          setFollowing(!following);
        } else {
          throw new Error(response.status);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Paper style={IsMobile() ? headerStyleMobile : headerStyleDesktop}>
      <div style={{ display: "flex" }}>
        <Avatar sx={IsMobile() ? avatarStyleMobile : avatarStyleDesktop}>
          {username.substring(0, 1).toUpperCase()}
        </Avatar>
        <h1 style={{ marginLeft: "1rem" }}>{username}</h1>
      </div>
      <div>
        {currentUser.username != username &&
        <Button variant="contained" size="small" endIcon={following ? <RemoveIcon/> : <AddIcon />} onClick={toggleFollow}>
          {following ? <>Unfollow</> : <>Follow</>}
        </Button>
        }

      </div>
    </Paper>
  );
}

export default ProfileHeader;
