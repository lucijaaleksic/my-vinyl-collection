import React from "react";
import { IsMobile } from "../util/utils";
import { Button, TextField } from "@mui/material";

function Form({ children, style, onSubmit }) {
  const formStyle = IsMobile()
    ? {
        display: "flex",
        flexDirection: "column",
        zIndex: 2,
        width: "90%",
      }
    : { display: "flex", flexDirection: "column", zIndex: 2, width: "40%" };
  return (
    <form style={{ ...formStyle, ...style }} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function FormRow({
  name,
  type,
  required,
  label,
  value,
  onChange,
  error,
  helperText,
  onClick,
}) {
  return (
    <TextField
      size="small"
      variant="filled"
      type={type}
      style={{
        margin: "0.5rem",
        marginTop: "1rem",
        backgroundColor: "white",
        borderRadius: "4px",
      }}
      required={required}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      onClick={onClick}
    />
  );
}

function FormSubmit() {
  const submitStyle = {
    backgroundColor: "#e25c3b",
    marginLeft: "auto",
    marginTop: "auto",
  };

  return (
    <Button variant="contained" sx={submitStyle} type="submit">
      Submit
    </Button>
  );
}

Form.Row = FormRow;
Form.Submit = FormSubmit;

export default Form;
