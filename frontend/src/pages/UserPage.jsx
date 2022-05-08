import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authHeader from "../auth-header";
import ProfileHeader from "../components/ProfileHeader";
import VinylCollection from "../components/VinylCollection";
import { Alert, LinearProgress } from "@mui/material";

function UserPage() {
  const api = process.env.REACT_APP_API_URL;
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [favVinyls, setFavVinyls] = useState([]);
  const [errorMessage, setErrorMessage] = React.useState(false);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: authHeader(),
      Origin: origin,
    },
  };

  React.useEffect(() => {
    fetch(api + "/users/favourites", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((favVinlys) => {
        setFavVinyls(favVinlys);
      })
      .catch((err) => {
        setErrorMessage(true);
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    fetch(api + `/users/profile/${params.username}`, requestOptions)
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        console.log(data)
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(true);
        setLoading(false);
        console.log(err);
      });
  }, []);

  const containerStyle = {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    maxWidth: "100%",
  };

  return (
    <div style={containerStyle}>
      {loading ? (
        <LinearProgress style={{ marginTop: "1rem" }} />
      ) : errorMessage ? (
        <Alert variant="outlined" severity="error">
          Error occurred while communicating with the server.
        </Alert>
      ) : (
        <>
          <ProfileHeader username={data.username} />
          <div
            style={{
              border: "rgb(164,164,164) solid 0.3px",
              borderRadius: "5px",
              margin: "auto",
              padding: "1rem",
            }}
          >
            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2 style={{ marginRight: "1rem" }}>Contact Mail</h2>
              <p>{data.contactEmail}</p>
            </div>
            <div
              style={{
                borderBottom: "rgb(164,164,164) solid 0.3px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2 style={{ marginRight: "1rem" }}>Location</h2>
              <p> {data.location ? data.location.city : "unknown"}</p>
            </div>
            <h2 style={{ marginRight: "1rem" }}>
              {data.username}'s collection:
            </h2>
            {data.vinyls.length > 0 ? (
              <VinylCollection
                data={data.vinyls}
                favVinyls={favVinyls}
                updateFunction={setFavVinyls}
              />
            ) : (
              <Alert variant="outlined" severity="info">
                No vinyls in this collection.
              </Alert>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserPage;
