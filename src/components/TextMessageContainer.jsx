import React from "react";
import Texts from "./Texts";

const TextMessageContainer = ({ chosenUser }) => {
  return (
    <div className="w-full bg-[#1976d2] flex justify-center ">
      <Texts chosenUser={chosenUser} />
    </div>
  );
};

export default TextMessageContainer;
