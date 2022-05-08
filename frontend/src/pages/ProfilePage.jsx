import React from "react";

import ProfileHeader from "../components/ProfileHeader";

import { Autocomplete, Button, LinearProgress, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { getCurrentUser, IsMobile } from "../util/utils";
import authHeader from "../auth-header";
import LocationMap from "../components/LocationMap";

const infoContainerStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  marginTop: "1rem",
  border: "rgb(164,164,164) solid 0.3px",
  borderRadius: "5px",
  padding: "1rem",
};
const containerStyle = {
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: "flex-start",
  maxWidth: "100%",
};

function ProfilePage() {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;
  const mobile = IsMobile();
  const [username, setUsername] = React.useState(getCurrentUser());
  const [data, setData] = React.useState({});
  const [editingMode, setEditingMode] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [location, setLocation] = React.useState({});
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [email, setEmail] = React.useState();
  const [contactEmail, setContactEmail] = React.useState();

  const [password, setPassword] = React.useState();
  const [newPassword, setNewPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState();

  React.useEffect(() => {
    fetch(api + `/users/info`, {
      method: "GET",
      headers: {
        Origin: origin,
        Authorization: authHeader(),
      },
    }).then((response) => {
      response.json().then((result) => {
        setData(result);
        setLatitude(result.location.latitude);
        setLongitude(result.location.longitude);
      });
    });
  }, [api, username]);

  React.useEffect(() => {
    if (loading) {
      setName(data.name);
      setSurname(data.surname);
      setLocation(data.location);
      setEmail(data.email);
      setContactEmail(data.contactEmail);
      setPassword(data.password);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      localStorage.setItem("username", username);
      fetch(api + `/users/info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: authHeader(),
        },
        body: JSON.stringify(data),
      }).then((r) => r.json());
    }
  }, [data]);

  function saveChanges() {
    if (confirmPassword === newPassword) {
      setEditingMode(false);
      localStorage.setItem("username", username);
      setErrorMessage("");
      setConfirmPassword("");
      setData({
        name: name,
        surname: surname,
        username: username,
        location: {
          latitude: latitude,
          longitude: longitude,
        },
        email: email,
        password: newPassword,
      });
    } else {
      setErrorMessage("Passwords must match");
      setConfirmPassword("");
      setPassword("");
    }
  }

  function cancelChanges() {
    setName(data.name);
    setSurname(data.surname);
    setUsername(data.username);
    setLocation(data.location);
    setEmail(data.email);
    setPassword(data.password);
    setEditingMode(false);
  }

  return (
    <form
      style={
        mobile ? { ...containerStyle, marginBottom: "4rem" } : containerStyle
      }
      autocomplete="off"
    >
      <ProfileHeader username={username} />
      {loading ? (
        <LinearProgress />
      ) : (
        <div
          style={
            mobile
              ? { ...infoContainerStyle, width: "80%" }
              : { ...infoContainerStyle, width: "65%" }
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              style={{ width: "49%", marginTop: "2rem" }}
              label="Name"
              value={name}
              disabled={!editingMode}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={{ width: "49%", marginTop: "2rem" }}
              label="Surname"
              disabled={!editingMode}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

          <TextField
            style={{ marginTop: "2rem" }}
            label="e-mail"
            disabled={!editingMode}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ marginTop: "2rem" }}
            label="Contact e-mail"
            disabled={!editingMode}
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />

          <LocationMap
            lat={data.location.latitude}
            lng={data.location.longitude}
            setLat={setLatitude}
            setLng={setLongitude}
            editing={editingMode}
          />

          <p style={{ color: "red", fontSize: "12px", marginTop: "1rem" }}>
            {errorMessage}
          </p>

          <TextField
            label="New Password"
            type="password"
            disabled={!editingMode}
            autoComplete={false}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <TextField
            style={{ marginTop: "2rem" }}
            label="Confirm Password"
            type="password"
            disabled={!editingMode}
            autoComplete={false}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div style={{ marginTop: "1rem" }}>
            {editingMode ? (
              <>
                <Button variant="contained" onClick={cancelChanges}>
                  Cancel
                </Button>
                <Button variant="outlined" onClick={saveChanges}>
                  Save
                </Button>
              </>
            ) : (
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                onClick={() => setEditingMode(true)}
              >
                Update
              </Button>
            )}
          </div>
        </div>
      )}
    </form>
  );
}

export default ProfilePage;
