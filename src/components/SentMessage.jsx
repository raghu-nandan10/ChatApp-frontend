import React, { useEffect, useState } from "react";

const SentMessage = ({ from, messageObject }) => {
  return (
    <div className="w-full    flex justify-end    text-sm  ">
      <div className=" flex flex-col gap-1">
        <div className=" flex flex-col bg-gray-100 gap-1 p-2 max-w-[80%] min-w-fit mr-5 rounded-xl  relative   ">
          {messageObject.isGroupMsg && (
            <span className="text-[#1976d2]  font-semibold">{from}</span>
          )}
          <span>{messageObject.message}</span>
        </div>
        <div className="flex  gap-1 text-[10px] mr-5 relative">
          {messageObject?.seenByUsers?.length > 0 && (
            <span className=" font-semibold ">seen by</span>
          )}
          {messageObject?.seenByUsers?.map((username, index) => {
            return (
              <span key={index} className="text-[#1976d2] font-semibold">
                {username}
                {messageObject.seenByUsers.length != index + 1 && ","}
              </span>
            );
          })}
          <div className="text-[10px]   text-end  font-bold text-[#1976d2]  mr-5">
            {messageObject.time}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentMessage;
