import React from "react";
import {Formik} from "formik";
import Form from "./Form";
import {Autocomplete, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import authHeader from "../auth-header";

function PickArtistForm({data, updateFunction}){
  const api = process.env.REACT_APP_API_URL;

  const formStyle = {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <Formik
      initialValues={{artist: ""}}
      onSubmit={values => {
        let id = data.filter(v => v.artist.name == values.artist)[0].artist.id;
        fetch(api + `/vinyls/subcollection/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader(),
          },
        }).then(response => {
            updateFunction();
        }).catch(err => {
          console.log(err);
        });
      }}
      >
      {
        (formik) => {
          return (
            <Form style={formStyle}>
              <h1 style={{margin: "auto"}}>Create a new sub-collection</h1>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={[...new Set(data.map(v => v.artist.name))]}
                onChange={(e, value) => formik.setFieldValue("artist", value)}
                sx={{marginTop: "1rem", marginBottom: "1rem", marginLeft: "0.5rem"}}
                renderInput={(params) => <TextField
                  {...params}
                  label="Artist"
                />}
              />
              <Button onClick={formik.handleSubmit}>
                Add
              </Button>
            </Form>
          );
        }
      }

    </Formik>
  );
}

export default PickArtistForm;