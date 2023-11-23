import React from "react";
import MultilineText from "./MultilineText";
import SendButton from "./SendButton";

const MessageTypeContainer = ({
  handleMessageInputChange,
  handleSubmit,
  message,
}) => {
  return (
    <div className="h-[10%] rounded-3xl rounded-t-none  flex justify-evenly items-center  ">
      <MultilineText
        handleMessageInputChange={handleMessageInputChange}
        message={message}
      />
      <SendButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default MessageTypeContainer;
