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
      socket.emit("message:seen", {
        messageId: messageObject.id,
        userSeen: state.currentUser,
        fromUser: messageObject.fromUser,
        toUser: messageObject.toUser,
      });
    }
  }, [inView]);
  return (
    <div ref={ref} className="w-full    flex justify-start  text-sm   ">
      <div className=" flex flex-col">
        <div className=" flex flex-col bg-gray-100 gap-1 relative ml-5  p-2 min-w-fit max-w-[80%] rounded-xl    ">
          {messageObject.isGroupMsg && (
            <span className="text-[#1976d2]  font-semibold">
              {messageObject.fromUser}
            </span>
          )}

          <span>{messageObject.message}</span>
        </div>
        <div className="text-[10px]   text-end  font-bold text-[#1976d2] pr-1 ">
          {messageObject.time}
        </div>
      </div>
    </div>
  );
};

export default ReceiverMessage;
