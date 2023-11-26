import React from "react";
import MultilineText from "./MultilineText";
import SendButton from "./SendButton";
import { Button } from "@carbon/react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
const MessageTypeContainer = ({
  handleMessageInputChange,
  handleSubmit,
  message,
  handleEmojiOpenClose,
  openEmojiRef,
}) => {
  return (
    <div className="h-[10%] rounded-3xl rounded-t-none  flex justify-evenly items-center  ">
      <MultilineText
        handleMessageInputChange={handleMessageInputChange}
        message={message}
      />
      <div ref={openEmojiRef}>
        <MdOutlineEmojiEmotions
          className="cursor-pointer"
          onClick={handleEmojiOpenClose}
          size={30}
        />
      </div>

      <SendButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default MessageTypeContainer;
