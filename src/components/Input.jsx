import React from "react";
import TextField from "@mui/material/TextField";
const Input = ({ handleInputChange, name, type, label, isValid }) => {
  return (
    <TextField
      id="outlined-basic"
      className="w-[90%]"
      variant="outlined"
      error={!isValid}
      type={type || ""}
      name={name}
      label={label}
      onChange={handleInputChange}
    />
  );
};

export default Input;
