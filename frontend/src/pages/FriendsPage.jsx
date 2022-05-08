import React, { useEffect, useState } from "react";
import authHeader from "../auth-header";
import { Alert, LinearProgress } from "@mui/material";
import ProfileHeader from "../components/ProfileHeader";
import VinylCollection from "../components/VinylCollection";
import FriendListItem from "../components/FriendListItem";

function FriendsPage() {
  const api = process.env.REACT_APP_API_URL;
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    fetch(api + "/users/friends", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setErrorMessage(true);
          throw new Error(response.status);
        }
      })
      .then((data) => {
        setFriends(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ flexGrow: 1, textAlign: "center" }}>
      <h1 style={{ marginBottom: "4rem" }}>Followed users</h1>
      {loading ? (
        <LinearProgress style={{ marginTop: "1rem" }} />
      ) : errorMessage ? (
        <Alert variant="outlined" severity="error">
          Error occurred while communicating with the server.
        </Alert>
      ) : (
        <>
          {friends.length > 0 ? (
            friends.map((f) => (
              <div style={{ margin: "auto", marginTop: "2rem", width: "75%" }}>
                <FriendListItem userData={f} username={f.username} />
              </div>
            ))
          ) : (
            <Alert variant="outlined" severity="info">
              No users are followed.
            </Alert>
          )}
        </>
      )}
    </div>
  );
}

export default FriendsPage;
