import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import Form from "../components/Form";
import Button from "@mui/material/Button";
import { IsMobile } from "../util/utils";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import * as yup from "yup";
import authHeader from "../auth-header";

function AddVinylPage() {
  const api = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const moment = require("moment");
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [artists, setArtists] = React.useState([]);
  const [genre, setGenre] = React.useState([]);
  let subgenresOptions = [];

  const formStyle = {
    margin: "auto",
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

  const containerStyle = {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    maxWidth: "100%",
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: authHeader(),
      Origin: origin,
    },
  };

  React.useEffect(() => {
    fetch(api + "/genres", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setErrorMessage(true);
      })
      .then((data) => {
        setGenre(data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(true);
      });

    fetch(api + "/artists", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setErrorMessage(true);
      })
      .then((data) => {
        setArtists(data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(true);
      });
  }, []);

  const validationSchema = yup.object({
    album: yup.string("Enter album name").required("Album name is required"),
    artistId: yup
      .string("Enter artist")
      .nullable()
      .required("Artist is required"),
    releaseYear: yup
      .number("Enter release year")
      .typeError("Year must be a number")
      .min(1900)
      .max(3000)
      .required("Release year is required"),
    genreId: yup
      .string("Enter genre of the album")
      .nullable()
      .required("Genre is required"),
    subgenreId: yup.string("Enter subgenre").nullable(),
    conditionEvaluation: yup
      .number("Enter condition of the vinyl [1-10]")
      .typeError("Condition must be a number")
      .min(1)
      .max(10)
      .required("Condition is required"),
    description: yup.string("Enter vinyl description").default(""),
    priceKn: yup
      .number("Enter vinyl price")
      .typeError("Price must be a number")
      .min(0),
    rpm: yup.string("Enter RPM").required("RPM is required"),
    diameter: yup
      .number("Enter diameter")
      .typeError("Diameter must be a number"),
    capacity: yup
      .number("Enter capacity")
      .typeError("Capacity must be a number")
      .required("Capacity is required"),
    reproductionQuality: yup
      .string("Enter reproduction quality")
      .required("Reproduction quality is required"),
    nmbOfAudioChannels: yup
      .number("Enter number of audio channels")
      .typeError("Number of audio channels must be a number")
      .moreThan(0)
      .required("Number of audio channels is required"),
    timeOfReproduction: yup
      .string("Enter time of reproduction")
      .matches(/^\d\d:\d\d:\d\d$/, "Invalid time format")
      .test("is-time", "Invalid time format", (value) =>
        moment(value, "HH:mm:ss").isSameOrBefore(moment("24:00:00", "HH:mm:ss"))
      )
      .required("Time of reproduction is required"),
  });

  return (
    <div
      style={
        IsMobile()
          ? { ...containerStyle, marginBottom: "4rem" }
          : containerStyle
      }
    >
      <Formik
        initialValues={{
          album: "",
          artistId: "",
          releaseYear: "",
          genreId: "",
          subgenreId: "",
          conditionEvaluation: "",
          rare: "No",
          description: "",
          priceKn: "",
          rpm: "",
          diameter: "",
          capacity: "",
          reproductionQuality: "",
          nmbOfAudioChannels: "",
          timeOfReproduction: "",
        }}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={(values) => {
          values.artistId = artists.filter(
            (a) => a.name == values.artistId
          )[0].id;
          values.releaseYear = parseInt(values.releaseYear);
          values.genreId = genre.filter((g) => g.name == values.genreId)[0].id;
          values.conditionEvaluation = parseInt(values.conditionEvaluation);
          values.rare = values.rare === "Yes" ? true : false;
          values.nmbOfAudioChannels = parseInt(values.nmbOfAudioChannels);
          if (values.description == "") {
            delete values.description;
          }
          if (values.subgenreId == "") {
            delete values.subgenreId;
          } else {
            values.subgenreId = genre
              .filter((g) => g.id == values.genreId)[0]
              .subgenres.filter((subg) => subg.name == values.subgenreId)[0].id;
          }
          if (values.priceKn == "") {
            delete values.priceKn;
          } else {
            values.priceKn = parseFloat(values.priceKn);
          }
          if (values.diameter == "") {
            delete values.diameter;
          } else {
            values.diameter = parseFloat(values.diameter);
          }

          console.log(JSON.stringify(values, null, 2));
          fetch(api + `/vinyls`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
            body: JSON.stringify(values),
          })
            .then((response) => {
              console.log(response);
              if (response.ok) {
                history.push("/dashboard/collection");
              } else {
                setErrorMessage(true);
              }
            })
            .catch((err) => {
              console.log(err);
              setErrorMessage(true);
            });
        }}
      >
        {(formik) => {
          return (
            <Form style={formStyle}>
              <h1>Add a new Vinyl to your collection</h1>
              {errorMessage && (
                <p style={{ color: "red", fontSize: "13.5px", margin: "auto" }}>
                  Vinyl not valid. Try again...
                </p>
              )}

              <Form.Row
                label="Album"
                type="text"
                value={formik.values.album}
                name="album"
                onChange={formik.handleChange}
                required
                onBlur={formik.handleBlur}
                onClick={() => formik.setFieldTouched("album", true)}
                error={formik.touched.album && Boolean(formik.errors.album)}
                helperText={formik.touched.album && formik.errors.album}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={artists.map((a) => a.name)}
                onChange={(e, value) => formik.setFieldValue("artistId", value)}
                sx={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  marginLeft: "0.5rem",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Artist"
                    onBlur={formik.handleBlur}
                    onClick={() => formik.setFieldTouched("artistId", true)}
                    error={
                      formik.touched.artistId && Boolean(formik.errors.artistId)
                    }
                    helperText={
                      formik.touched.artistId && formik.errors.artistId
                    }
                  />
                )}
              />

              <Form.Row
                label="Release year"
                type="text"
                value={formik.values.releaseYear}
                name="releaseYear"
                onChange={formik.handleChange}
                required
                onBlur={formik.handleBlur}
                onClick={() => formik.setFieldTouched("releaseYear", true)}
                error={
                  formik.touched.releaseYear &&
                  Boolean(formik.errors.releaseYear)
                }
                helperText={
                  formik.touched.releaseYear && formik.errors.releaseYear
                }
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={genre.map((g) => g.name)}
                onChange={(e, value) => formik.setFieldValue("genreId", value)}
                sx={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  marginLeft: "0.5rem",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Genre"
                    onBlur={formik.handleBlur}
                    onClick={() => formik.setFieldTouched("genreId", true)}
                    error={
                      formik.touched.genreId && Boolean(formik.errors.genreId)
                    }
                    helperText={formik.touched.genreId && formik.errors.genreId}
                  />
                )}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={
                  genre.filter((g) => g.name == formik.values.genreId).length >
                  0
                    ? genre
                        .filter((g) => g.name == formik.values.genreId)[0]
                        .subgenres.map((subg) => subg.name)
                    : []
                }
                onChange={(e, value) =>
                  formik.setFieldValue("subgenreId", value)
                }
                sx={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  marginLeft: "0.5rem",
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Subgenre" />
                )}
              />

              <Form.Row
                label="Condition evaluation"
                type="text"
                value={formik.values.conditionEvaluation}
                name="conditionEvaluation"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={() =>
                  formik.setFieldTouched("conditionEvaluation", true)
                }
                error={
                  formik.touched.conditionEvaluation &&
                  Boolean(formik.errors.conditionEvaluation)
                }
                helperText={
                  formik.touched.conditionEvaluation &&
                  formik.errors.conditionEvaluation
                }
              />

              <Form.Row
                label="Description"
                type="text"
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={() => formik.setFieldTouched("description", true)}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />

              <Form.Row
                label="Price (in HRK)"
                type="text"
                value={formik.values.priceKn}
                name="priceKn"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={() => formik.setFieldTouched("priceKn", true)}
                error={formik.touched.priceKn && Boolean(formik.errors.priceKn)}
                helperText={formik.touched.priceKn && formik.errors.priceKn}
              />

              <Form.Row
                label="RPM"
                type="text"
                value={formik.values.rpm}
                name="rpm"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={() => formik.setFieldTouched("rpm", true)}
                error={formik.touched.rpm && Boolean(formik.errors.rpm)}
                helperText={formik.touched.rpm && formik.errors.rpm}
              />

              <Form.Row
                label="Diameter"
                type="text"
                value={formik.values.diameter}
                name="diameter"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={() => formik.setFieldTouched("diameter", true)}
                error={
                  formik.touched.diameter && Boolean(formik.errors.diameter)
                }
                helperText={formik.touched.diameter && formik.errors.diameter}
              />

              <Form.Row
                label="Capacity"
                type="text"
                value={formik.values.capacity}
                name="capacity"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={() => formik.setFieldTouched("capacity", true)}
                error={
                  formik.touched.capacity && Boolean(formik.errors.capacity)
                }
                helperText={formik.touched.capacity && formik.errors.capacity}
              />

              <Form.Row
                label="Reproduction quality"
                type="text"
                value={formik.values.reproductionQuality}
                name="reproductionQuality"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={() =>
                  formik.setFieldTouched("reproductionQuality", true)
                }
                error={
                  formik.touched.reproductionQuality &&
                  Boolean(formik.errors.reproductionQuality)
                }
                helperText={
                  formik.touched.reproductionQuality &&
                  formik.errors.reproductionQuality
                }
              />

              <Form.Row
                label="Number of audio channels"
                type="text"
                value={formik.values.nmbOfAudioChannels}
                name="nmbOfAudioChannels"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={() =>
                  formik.setFieldTouched("nmbOfAudioChannels", true)
                }
                error={
                  formik.touched.nmbOfAudioChannels &&
                  Boolean(formik.errors.nmbOfAudioChannels)
                }
                helperText={
                  formik.touched.nmbOfAudioChannels &&
                  formik.errors.nmbOfAudioChannels
                }
              />

              <Form.Row
                label="Time of reproduction"
                type="text"
                value={formik.values.timeOfReproduction}
                name="timeOfReproduction"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={() =>
                  formik.setFieldTouched("timeOfReproduction", true)
                }
                error={
                  formik.touched.timeOfReproduction &&
                  Boolean(formik.errors.timeOfReproduction)
                }
                helperText={
                  formik.touched.timeOfReproduction &&
                  formik.errors.timeOfReproduction
                }
              />

              <div style={{ marginLeft: "1rem", marginTop: "1rem" }}>
                <div id="my-radio-group">Is the vinyl rare?</div>
                <div
                  style={{ marginTop: "0.3rem" }}
                  role="group"
                  aria-labelledby="my-radio-group"
                >
                  <label>
                    <Field type="radio" name="rare" value="Yes" />
                    Yes
                  </label>
                  <label>
                    <Field
                      style={{ marginLeft: "1rem" }}
                      type="radio"
                      name="rare"
                      value="No"
                    />
                    No
                  </label>
                </div>
              </div>

              <Button onClick={formik.handleSubmit} style={btnStyle}>
                Add
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddVinylPage;
