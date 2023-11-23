import React, { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { socketContext } from "../Providers/SocketContextProvider";

const ReceiverMessage = ({ messageObject }) => {
  const { state } = useContext(socketContext);
  const { socket } = state;
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  useEffect(() => {
    if (inView) {
      console.log("seen triggered by the user " + state.currentUser);
      socket.emit("message:seen", {
        messageId: messageObject.id,
        userSeen: state.currentUser,
      });
    }
  }, [inView]);
  return (
    <div ref={ref} className="w-full    flex justify-start  text-sm   ">
      <div className=" flex flex-col bg-gray-100 gap-1 relative ml-2  p-2 w-[80%] rounded-xl    ">
        <span className="text-[#1976d2]  font-semibold">
          {messageObject.fromUser}
        </span>
        <span>{messageObject.message}</span>
        <div className="text-[8px] absolute top-3 right-3">
          {messageObject.time}
        </div>
      </div>
    </div>
  );
};

export default ReceiverMessage;
