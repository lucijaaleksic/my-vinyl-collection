import React from "react";
import { pageStyle } from "../styles/globalStyles";
import logoImg from "../assets/login.png";
import { Formik } from "formik";
import Button from "@mui/material/Button";

import Form from "../components/Form";
import { useHistory } from "react-router-dom";

function LogInPage() {
  const api = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState(false);
  const loginPageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const imageStyle = {
    position: "absolute",
    bottom: "-20%",
    animation: "floatUp 1s",
    zIndex: 0,
  };

  const formStyle = {
    animation: "fadeIn 4s",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const btnStyle = {
    width: "50%",
    margin: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  return (
    <div style={{ ...pageStyle, ...loginPageStyle }}>
      <img src={logoImg} style={imageStyle} alt="login_image" />
R      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            withCredentials: true,
            body: JSON.stringify({ ...values }, null, 2),
          };
          fetch(api + "/users/auth/login", requestOptions)
            .then((response) => {
              if (!response.ok) {
                setErrorMessage(true);
                throw new Error("HTTP status code: " + response.status);
              } else {
                return response.json();
              }
              })
            .then(data => {
              localStorage.setItem("user", JSON.stringify(data));
              history.push("/dashboard/homepage");
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {(formik) => {
          return (
            <Form style={formStyle}>
              {errorMessage && (
                <p style={{ color: "red", fontSize: "13.5px", margin: "auto" }}>
                  Invalid username/password. Try again.
                </p>
              )}
              <Form.Row
                label="Username"
                type="text"
                value={formik.values.username}
                name="username"
                onChange={formik.handleChange}
                required
              />
              <Form.Row
                label="Password"
                type="password"
                value={formik.values.password}
                name="password"
                onChange={formik.handleChange}
                required
              />
              <Button onClick={formik.handleSubmit} style={btnStyle}>
                Log in
              </Button>
              <p style={{ color: "white", margin: "auto" }}>
                Don't have an account?
                <span
                  onClick={() => history.push("/signup")}
                  style={{ color: "rgb(226,92,59)", cursor: "pointer" }}
                >
                  {" "}
                  Create one now.
                </span>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LogInPage;
