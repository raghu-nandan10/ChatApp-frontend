import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
const UserItem = ({ username, handleUserChoose }) => {
  return (
    <div
      onClick={() => {
        handleUserChoose(username);
      }}
      className="  flex p-3 hover:bg-white cursor-pointer transition-all relative duration-100 rounded-lg  "
    >
      <Avatar sx={{ bgcolor: "#3498db" }}>{username[0].toUpperCase()}</Avatar>
      <div className="text-center center p-1  ">
        <span className="ml-1 font-semibold">{username}</span>
      </div>
    </div>
  );
};

export default UserItem;
