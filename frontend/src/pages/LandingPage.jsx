import React from "react";

import { useHistory } from "react-router-dom";

import { Button } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";

import "../index.css";
import vinyl from "../assets/vinyl.png";
import { IsMobile } from "../util/utils";
import { pageStyle } from "../styles/globalStyles";

function LandingPage() {
  const homepageStyle = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    background: "linear-gradient(45deg, #FF9648, #FF6587)",
    position: "relative",
  };

  const homepageHeaderStyle = IsMobile()
    ? {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }
    : {
        width: "95%",
        display: "flex",
        alignItems: "start",
        justifyContent: "space-between",
        margin: "1rem",
      };

  const imageStyle = {
    animation: "rotation 20s infinite linear",
    position: "relative",
    bottom: "-15%",
    pointerEvents: "none",
  };

  const titleStyle = {
    fontSize: "5rem",
    margin: 0,
  };

  const history = useHistory();

  return (
    <div style={{ ...pageStyle, ...homepageStyle }}>
      <div style={homepageHeaderStyle}>
        <h1 style={titleStyle}>My Vinyl Collection</h1>
        <div
          style={
            IsMobile()
              ? { display: "flex", flexDirection: "column" }
              : { display: "flex" }
          }
        >
          <div style={{ display: "flex", marginBottom: "0.5rem" }}>
            <Button
              style={{ marginRight: "0.3rem" }}
              onClick={() => history.push("/login")}
              variant="contained"
            >
              Login
            </Button>
            <Button onClick={() => history.push("/signup")} variant="outlined">
              Signup
            </Button>
          </div>
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              history.push("/dashboard/homepage");
            }}
            endIcon={<ExploreIcon />}
            variant="contained"
            color="secondary"
            style={
              IsMobile()
                ? { marginBottom: "0.5rem" }
                : { marginBottom: "0.5rem", marginLeft: "0.3rem" }
            }
          >
            Explore
          </Button>
        </div>
      </div>
      <img style={imageStyle} alt="vinyl" src={vinyl} />
    </div>
  );
}

export default LandingPage;
