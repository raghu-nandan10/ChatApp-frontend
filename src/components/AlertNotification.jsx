import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const AlertNotification = () => {
  return (
    <Alert severity="info">
      <AlertTitle>Info</AlertTitle>
      New user has joined — <strong>check it out!</strong>
    </Alert>
  );
};

export default AlertNotification;
