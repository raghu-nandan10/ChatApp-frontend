import React from "react";
import Button from "@mui/material/Button";
const ButtonUi = ({ handleSubmit, buttonName }) => {
  return (
    <Button
      onClick={handleSubmit}
      className="w-[90%]"
      sx={{ padding: 1.5 }}
      variant="contained"
    >
      {buttonName}
    </Button>
  );
};

export default ButtonUi;
