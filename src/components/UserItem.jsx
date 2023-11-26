import React from "react";
import { Avatar } from "@mui/material";
const UserItem = ({ username, handleUserChoose, currentUser, typingUser }) => {
  return (
    <div
      onClick={() => {
        handleUserChoose(username);
      }}
      className="  flex   border-b p-3 hover:bg-white cursor-pointer transition-all  relative duration-100 rounded-lg  "
    >
      <Avatar sx={{ bgcolor: "#1976d2" }}>{username[0].toUpperCase()}</Avatar>
      <div className=" flex justify-between w-full items-center p-1   ">
        <span className="ml-1 font-semibold flex flex-col ">
          {username == currentUser ? "You" : username}
        </span>
        {typingUser == username && (
          <span className=" text-xs font-bold text-green-600">typing...</span>
        )}
      </div>
    </div>
  );
};

export default UserItem;
