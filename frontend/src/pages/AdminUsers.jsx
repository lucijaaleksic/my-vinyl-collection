import React from "react";

import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import FaceIcon from "@mui/icons-material/Face";

import authHeader from "../auth-header";

function AdminUsers() {
  const api = process.env.REACT_APP_API_URL;
  const [users, setUsers] = React.useState();
  const [blockedUsers, setBlockedUsers] = React.useState();

  React.useEffect(() => {
    fetch(api + "/users", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
      },
    }).then((response) =>
      response.json().then((d) => {
        setUsers(d);
        setBlockedUsers(d.filter((u) => u.active !== true));
      })
    );
  }, [users]);

  return (
    <List
      sx={{
        width: "70%",
        margin: "auto",
        bgcolor: "background.paper",
        overflow: "auto",
        maxHeight: "70%",
      }}
    >
      {users &&
        users.map(
          (user) =>
            user.username !== "admin" && (
              <>
                <AdminUserTab
                  isBlocked={blockedUsers && blockedUsers.includes(user)}
                  name={user.username}
                  setBlockedUsers={setBlockedUsers}
                  setUsers={setUsers}
                />
                <Divider variant="inset" component="li" />
              </>
            )
        )}
    </List>
  );
}

function AdminUserTab({ name, isBlocked, setUsers, setBlockedUsers }) {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;

  function handleBlock() {
    fetch(api + `/users/status/${name}`, {
      method: "PUT",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((r) =>
      r.json().then(() => {
        fetch(api + "/users", {
          method: "GET",
          headers: {
            Authorization: authHeader(),
            Origin: origin,
          },
        }).then((response) =>
          response.json().then((d) => {
            setUsers(d);
            setBlockedUsers(d.filter((u) => u.active !== true));
          })
        );
      })
    );
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {isBlocked ? (
            <BlockIcon color="error" />
          ) : (
            <FaceIcon style={{ color: "black" }} />
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} />
      {isBlocked ? (
        <Button onClick={handleBlock}>UNBLOCK</Button>
      ) : (
        <Button onClick={handleBlock}>BLOCK</Button>
      )}
    </ListItem>
  );
}

export default AdminUsers;
