import React, { useState, useContext, useEffect } from "react";
import UserHeader from "./UserHeader";
import MessagesContainer from "./MessagesContainer";
import MessageTypeContainer from "./MessageTypeContainer";
import { socketContext } from "../Providers/SocketContextProvider";
import uuid from "react-uuid";
const Texts = ({ chosenUser }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { state } = useContext(socketContext);
  const { socket } = state;
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    const handleShowTyping = (payload) => {
      setTypingUser(payload.username);
      setTimeout(() => {
        setTypingUser("");
      }, 1000);
    };

    const handleMessageFromUser = (payload) => {
      setMessages((prev) => {
        return [...prev, payload];
      });
    };
    const handleCookie = ({ cookieName, access_token }) => {
      document.cookie = `${cookieName}=${access_token}`;
    };

    const handleMsgSeen = (payload) => {
      console.log(payload);
      const updatedMessageArray = messages.map((messageObj) => {
        if (messageObj.id == payload.id) {
          console.log("Found..");
          const tempUserSeen = messageObj.seenByUsers;
          tempUserSeen.push(payload.userSeen);
          console.log(tempUserSeen);
          return { ...messageObj, seenByUsers: tempUserSeen };
        }
        return { ...messageObj };
      });

      setMessages(updatedMessageArray);
    };

    socket.on("show:typing", handleShowTyping);
    socket.on("msg:from:user", handleMessageFromUser);
    socket.on("store:cookie", handleCookie);
    socket.on("msg:seen:show", handleMsgSeen);
    return () => {
      socket.off("show:typing", handleShowTyping);
      socket.off("msg:from:user", handleMessageFromUser);
      socket.off("msg:from:user", handleMessageFromUser);
    };
  }, [messages]);

  const handleMessageInputChange = (e) => {
    setMessage(e.target.value);
    socket.emit("user:typing", {});
  };

  const handleSubmit = () => {
    console.log();
    socket.emit("send:msg", {
      toUser: chosenUser,
      message,
      id: uuid(),
    });
    setMessage("");
  };
  return (
    <div className="bg-white rounded-3xl min-w-[350px] w-[40%] h-[85%] flex flex-col ">
      <UserHeader chosenUser={chosenUser} typingUser={typingUser} />
      <MessagesContainer messages={messages} />
      <MessageTypeContainer
        handleMessageInputChange={handleMessageInputChange}
        handleSubmit={handleSubmit}
        message={message}
      />
    </div>
  );
};

export default Texts;
