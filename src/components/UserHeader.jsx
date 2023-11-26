import React, { useEffect } from "react";
import { Avatar } from "@mui/material";
const UserHeader = ({ chosenUser, typingUser }) => {
  return (
    <div className=" relative  h-[10%]  flex items-center p-2  font-bold text-black border ">
      <Avatar sx={{ bgcolor: "#1976d2" }}>{chosenUser[0].toUpperCase()}</Avatar>
      <span className="ml-2">{chosenUser}</span>
      {typingUser && (
        <span className="text-green-600 text-xs  absolute  bottom-1 left-3">
          {typingUser} is typing...
        </span>
      )}
    </div>
  );
};

export default UserHeader;
