import React from "react";
import Button from "@mui/material/Button";
const ButtonOutlinedUi = ({ buttonName, handleloginsubmit }) => {
  return (
    <Button
      onClick={handleloginsubmit}
      className="w-[90%]"
      sx={{ padding: 1.5 }}
      variant="outlined"
    >
      {buttonName}
    </Button>
  );
};

export default ButtonOutlinedUi;
