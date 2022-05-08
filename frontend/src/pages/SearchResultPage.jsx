import React from "react";
import { useLocation } from "react-router-dom";
import FriendListItem from "../components/FriendListItem";
import { Alert } from "@mui/material";

function SearchResultPage() {
  const location = useLocation();

  return (
    <div style={{ flexGrow: 1, marginTop: "2rem" }}>
      {location.state.data.length > 0 ? (
        <div
          style={{
            border: "1px solid gray",
            padding: "2rem",
            paddingBottom: 0,
            width: "80%",
            margin: "auto",
            borderRadius: 10,
          }}
        >
          <h1 style={{ margin: 0 }}>Search results</h1>
          {location.state.data.map((u) => (
            <div>
              <FriendListItem userData={null} username={u} />
            </div>
          ))}
        </div>
      ) : (
        <Alert style={{ margin: "1rem" }} variant="outlined" severity="info">
          No users match the search pattern.
        </Alert>
      )}
    </div>
  );
}

export default SearchResultPage;
