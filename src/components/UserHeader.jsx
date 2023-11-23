import React from "react";

const UserHeader = ({ chosenUser, typingUser }) => {
  return (
    <div className="rounded-3xl relative rounded-b-none h-[10%]  flex items-center  font-bold text-[#1976d2] border bg-gray-100">
      <span className="ml-3">{chosenUser}</span>
      {typingUser && (
        <span className="text-green-600 text-xs  absolute  bottom-1 left-3">
          {typingUser} is typing...
        </span>
      )}
    </div>
  );
};

export default UserHeader;
