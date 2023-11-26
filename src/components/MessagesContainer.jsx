import React, { useContext, useEffect } from "react";
import SentMessage from "./SentMessage";
import ReceiverMessage from "./ReceivedMessage";

const MessagesContainer = ({ messages, state }) => {
  return (
    <div className="h-[80%] overflow-y-scroll  pt-2 flex flex-col gap-1 scroll-smooth   ">
      {messages &&
        messages.map((messageObject) => {
          return state.currentUser != messageObject.fromUser ? (
            <ReceiverMessage
              messageObject={messageObject}
              key={messageObject.id}
            />
          ) : (
            <SentMessage
              from={"you"}
              messageObject={messageObject}
              key={messageObject.id}
            />
          );
        })}
    </div>
  );
};

export default MessagesContainer;
