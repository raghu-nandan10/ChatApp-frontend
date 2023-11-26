import React from "react";
import Texts from "./Texts";

const TextMessageContainer = ({ chosenUser, typingUser, setTypingUser }) => {
  return (
    <div className="w-[80%] bg-[#1976d2] flex justify-center ">
      <Texts
        chosenUser={chosenUser}
        typingUser={typingUser}
        setTypingUser={setTypingUser}
      />
    </div>
  );
};

export default TextMessageContainer;
