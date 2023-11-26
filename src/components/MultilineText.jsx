import React from "react";
import TextField from "@mui/material/TextField";

const MultilineText = ({ handleMessageInputChange, message }) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      className="w-[75%] p-2 "
      value={message}
      onChange={handleMessageInputChange}
    />
  );
};

export default MultilineText;
