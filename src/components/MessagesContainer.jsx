import React, { useContext } from "react";
import SentMessage from "./SentMessage";
import ReceiverMessage from "./ReceivedMessage";
import { socketContext } from "../Providers/SocketContextProvider";

const MessagesContainer = ({ messages }) => {
  const { state } = useContext(socketContext);
  return (
    <div className="h-[80%] overflow-y-scroll  pt-2 flex flex-col gap-1 scroll-smooth   ">
      {messages &&
        messages.map((messageObject) => {
          return state.currentUser != messageObject.fromUser ? (
            <ReceiverMessage messageObject={messageObject} />
          ) : (
            <SentMessage from={"you"} messageObject={messageObject} />
          );
        })}
    </div>
  );
};

export default MessagesContainer;
