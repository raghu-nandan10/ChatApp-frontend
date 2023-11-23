import React from "react";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import { IoSendSharp } from "react-icons/io5";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const SendButton = ({ handleSubmit }) => {
  return (
    <div className="center ">
      <span
        className="rounded-full p-3 hover:bg-gray-100  cursor-pointer "
        onClick={handleSubmit}
      >
        <IoSendSharp size={30} className="text-[#1976d2] " />
      </span>
    </div>
  );
};

export default SendButton;
