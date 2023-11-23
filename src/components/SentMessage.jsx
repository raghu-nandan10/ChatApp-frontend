import React, { useEffect, useState } from "react";

const SentMessage = ({ from, messageObject }) => {
  return (
    <div className="w-full    flex justify-end  relative  text-sm  ">
      <div className=" flex flex-col bg-gray-100 gap-1 p-2 w-[80%] mr-2 rounded-xl  relative   ">
        <span className="text-[#1976d2]  font-semibold">{from}</span>
        <span>{messageObject.message}</span>
        <div className="text-[8px] absolute top-3 right-3">
          {messageObject.time}
        </div>
      </div>
      <div className="flex absolute bottom-0 right-3 flex-wrap gap-1 text-[10px]">
        {messageObject.seenByUsers.length > 0 && (
          <span className=" font-semibold ">seen by</span>
        )}
        {messageObject.seenByUsers.map((username) => {
          return (
            <span className="text-[#1976d2] font-semibold">{username}</span>
          );
        })}
      </div>
    </div>
  );
};

export default SentMessage;
