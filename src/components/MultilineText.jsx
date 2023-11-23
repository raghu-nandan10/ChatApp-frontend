import React from "react";
import TextField from "@mui/material/TextField";
const MultilineText = ({ handleMessageInputChange, message }) => {
  return (
    <TextField
      id="standard-basic"
      variant="standard"
      className="w-[80%] p-3 rounded-3xl "
      value={message}
      onChange={handleMessageInputChange}
    />
  );
};

export default MultilineText;
