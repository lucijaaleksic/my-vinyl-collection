import React from "react";
import { pageStyle } from "../styles/globalStyles";
import signupImg from "../assets/signup.png";
import Form from "../components/Form";
import publicIP from 'react-native-public-ip';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { IsMobile } from "../util/utils";

function SignUpPage() {
  const api = process.env.REACT_APP_API_URL;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [errorMessage, setErrorMessage] = React.useState(false);

  let genres = [];
  React.useEffect(() => {
    fetch(api + "/genres")
      .then((response) => response.json())
      .then((data) => {
        genres = data.map((g) => g["name"]);
      });
  }, []);

  let ipAddress = "";
  React.useEffect(() => {
    publicIP()
        .then(ip => {
          ipAddress = ip;
        })
        .catch(error => {
          console.log(error);
        })
  }, []);

  let genresData = [];


  const history = useHistory();

  const loginPageStyle = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  };

  const imageStyle = {
    position: "relative",
    bottom: "4vh",
    height: "110vh",
    animation: "floatUp 1s",
    zIndex: 0,
  };

  const formStyle = {
    animation: "fadeIn 4s",
  };

  const steps = ["Basic information", "Preferred genres"];

  const validationSchema = yup.object({
    name: yup.string("Enter your name").required("Name is required"),
    surname: yup.string("Enter your surname").required("Surname is required"),
    username: yup
      .string("Enter your username")
      .required("Username is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
     password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    repeatpassword: yup
      .string("Repeat your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password is required"),
  });

  function MultipleSelectCheckmarks() {
    const [genreName, setGenreName] = React.useState([]);

    React.useEffect(() => {
      genresData = genreName;
    }, [genreName]);

    const handleChange = (event) => {
      setGenreName(event.target.value);
    };

    return (
      <div style={{ marginTop: "2rem" }}>
        <FormControl sx={{ m: 1, width: "95%" }}>
          <InputLabel sx={{ color: "white" }} id="demo-multiple-checkbox-label">
            Preferred genres
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={genreName}
            onChange={handleChange}
            input={<OutlinedInput label="Preferred genres" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {genres.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={genreName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

  function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
      return step === 1;
    };

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
      <Box
        heigth="500px"
        width={IsMobile() ? "100%" : "50%"}
        sx={{ zIndex: 1, position: "absolute", top: "8rem" }}
      >
        <Stepper
          activeStep={activeStep}
          sx={
            IsMobile()
              ? {
                  "& .MuiStepLabel-label": { color: "white" },
                  "& .MuiStepLabel-label.Mui-active": { color: "#e25c3b" },
                  "& .MuiStepLabel-label.Mui-completed": { color: "#e25c3b" },
                  width: "100%",
                }
              : {
                  "& .MuiStepLabel-label": { color: "white" },
                  "& .MuiStepLabel-label.Mui-active": { color: "#e25c3b" },
                  "& .MuiStepLabel-label.Mui-completed": { color: "#e25c3b" },
                }
          }
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography color="white" variant="caption">
                  Optional
                </Typography>
              );
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  color="white"
                  sx={{
                    "& .MuiSvgIcon-root": { color: "white" },
                    "& .MuiSvgIcon-root.Mui-active": { color: "#e25c3b" },
                    "& .MuiSvgIcon-root.Mui-completed": { color: "#e25c3b" },
                    "& .MuiStepIcon-text": { color: "black", fill: "black" },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Formik
              initialValues={{
                name: "",
                surname: "",
                username: "",
                email: "",
                password: "",
                repeatpassword: "",
              }}
              validationSchema={validationSchema}
              validateOnMount
              onSubmit={(values) => {
                genresData = genresData.map(
                  (genre) => genres.indexOf(genre) + 1
                );
                delete values["repeatpassword"];
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(
                    { ...values, preferredGenres: genresData, ip: ipAddress},
                    null,
                    2
                  ),
                };
                fetch(api + "/users/auth/register", requestOptions)
                  .then((response) => {
                    if (response.ok) {
                      history.push("/login");
                    } else {
                      setErrorMessage(true);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {(formik) => {
                return (
                  <Form style={formStyle}>
                    {activeStep === 0 ? (
                      <>
                        <Form.Row
                          label="Name"
                          type="text"
                          value={formik.values.name}
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onClick={() => formik.setFieldTouched("name", true)}
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                          helperText={formik.touched.name && formik.errors.name}
                          required
                        />
                        <Form.Row
                          label="Surname"
                          type="text"
                          value={formik.values.surname}
                          name="surname"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onClick={() =>
                            formik.setFieldTouched("surname", true)
                          }
                          error={
                            formik.touched.surname &&
                            Boolean(formik.errors.surname)
                          }
                          helperText={
                            formik.touched.surname && formik.errors.surname
                          }
                          required
                        />
                        <Form.Row
                          label="Username"
                          type="text"
                          value={formik.values.username}
                          name="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onClick={() =>
                            formik.setFieldTouched("username", true)
                          }
                          error={
                            formik.touched.username &&
                            Boolean(formik.errors.username)
                          }
                          helperText={
                            formik.touched.username && formik.errors.username
                          }
                          required
                        />
                        <Form.Row
                          label="Email"
                          type="text"
                          value={formik.values.email}
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onClick={() => formik.setFieldTouched("email", true)}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                          required
                        />
                        <Form.Row
                          label="Password"
                          type="password"
                          value={formik.values.password}
                          name="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onClick={() =>
                            formik.setFieldTouched("password", true)
                          }
                          error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                          }
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
                          required
                        />
                        <Form.Row
                          label="Repeat password"
                          type="password"
                          value={formik.values.repeatpassword}
                          name="repeatpassword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onClick={() =>
                            formik.setFieldTouched("repeatpassword", true)
                          }
                          error={
                            formik.touched.repeatpassword &&
                            Boolean(formik.errors.repeatpassword)
                          }
                          helperText={
                            formik.touched.repeatpassword &&
                            formik.errors.repeatpassword
                          }
                          required
                        />
                      </>
                    ) : (
                      <>
                        <MultipleSelectCheckmarks />
                        {errorMessage && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "13.5px",
                              margin: "auto",
                              marginTop: "20px",
                            }}
                          >
                            User with that username is already registered.
                          </p>
                        )}
                      </>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        pt: 2,
                      }}
                    >
                      {activeStep !== 0 && (
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1, color: "white" }}
                        >
                          Back
                        </Button>
                      )}
                      <Box sx={{ width: "30%" }} />
                      <Button
                        disabled={Boolean(!formik.isValid)}
                        onClick={
                          activeStep === steps.length - 1
                            ? formik.handleSubmit
                            : handleNext
                        }
                        sx={{ color: "#e25c3b" }}
                      >
                        {activeStep === steps.length - 1 ? "Submit" : "Next"}
                      </Button>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </React.Fragment>
      </Box>
    );
  }

  return (
    <div style={{ ...pageStyle, ...loginPageStyle }}>
      <img src={signupImg} style={imageStyle} alt="login_image" />
      <HorizontalLinearStepper
        style={{
          animation: "fadeIn 4s",
        }}
      />
    </div>
  );
}

export default SignUpPage;
