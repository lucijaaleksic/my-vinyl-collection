import React from "react";

import {
  AppBar,
  Button,
  Grow,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import ToggleTheme from "./ToggleTheme";
import icon from "../assets/icon.png";
import { IsMobile } from "../util/utils";
import { useHistory } from "react-router-dom";
import authHeader from "../auth-header";

const api = process.env.REACT_APP_API_URL;

const navBarStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const leftSideStyle = { display: "flex", alignItems: "center" };
const logOutButtonStyle = { marginInline: "1rem" };
const helpBarMarginStyle = { marginTop: "4rem" };
const helpBarStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

function TopNavBar() {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const history = useHistory();

  const handleSearch = () => {
    if(searchValue == "") return;

    fetch(api + `/users/search/${searchValue}`, {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin
      },
    })
      .then((response) => {
        if(response.ok){
          return response.json();
        }
        else {
          throw new Error(response.status)
        }
      })
      .then((searchResult) => {
          history.push("/dashboard/search-result", {
            data: searchResult
          });
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <AppBar>
        <Toolbar style={navBarStyle}>
          <div style={leftSideStyle}>
            <img
              src={icon}
              alt="icon"
              style={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }}
            />
            <h2
              onClick={() => history.replace("/")}
              style={{ fontSize: "1.2rem", cursor: "pointer" }}
            >
              My Vinyl Collection
            </h2>
          </div>
          <div>
            <ToggleTheme />
            {IsMobile() ? (
              <IconButton onClick={() => setOpen(!open)}>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            ) : (
              <>
                <Button
                  style={logOutButtonStyle}
                  variant="contained"
                  disableElevation
                  startIcon={<LogoutIcon />}
                  onClick={() => {
                    localStorage.removeItem("user")
                    history.push("/")
                  }}
                >
                  Log out
                </Button>
                <TextField
                  variant="filled"
                  hiddenLabel
                  size="small"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <IconButton disableTouchRipple onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </>
            )}
          </div>
        </Toolbar>
        <Grow in={open}>
          <AppBar style={helpBarMarginStyle}>
            <form
                autocomplete="off">
              <Toolbar style={helpBarStyle}>
                <TextField
                  variant="filled"
                  hiddenLabel
                  size="small"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <IconButton disableTouchRipple onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
                <Button variant="contained" startIcon={<LogoutIcon />}>
                  Log out
                </Button>
              </Toolbar>
            </form>
          </AppBar>
        </Grow>
      </AppBar>
    </>
  );
}

export default TopNavBar;
