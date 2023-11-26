import React, { useState, useContext, useEffect, useRef } from "react";
import UserHeader from "./UserHeader";
import MessagesContainer from "./MessagesContainer";
import MessageTypeContainer from "./MessageTypeContainer";
import { socketContext } from "../Providers/SocketContextProvider";
import EmojiPicker from "emoji-picker-react";

import uuid from "react-uuid";
import Loader from "./Loader";
const Texts = ({ chosenUser, typingUser, setTypingUser }) => {
  const { state } = useContext(socketContext);
  const { socket } = state;
  const [message, setMessage] = useState("");
  const [personalChats, setPersonalChats] = useState({});
  const [messages, setMessages] = useState([]);
  const openEmojiRef = useRef(null);
  const emojiRef = useRef(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowTyping = (payload) => {
    setTypingUser(payload.username);
    setTimeout(() => {
      setTypingUser("");
    }, 1200);
  };
  const handleClickOutside = (event) => {
    if (
      emojiRef.current &&
      !emojiRef.current.contains(event.target) &&
      !openEmojiRef.current.contains(event.target)
    ) {
      setOpenEmoji(false);
    }
  };

  const handleMessageFromUser = (payload) => {
    console.log({ payload });
    const belongsToUser = payload.isGroupMsg ? "Group chat" : payload.fromUser;
    if (!personalChats[belongsToUser]) {
      personalChats[belongsToUser] = {
        msges: [],
      };
    }
    const fromUserChat = personalChats[belongsToUser];
    fromUserChat.msges.push({
      fromUser: payload.fromUser,
      message: payload.message,
      toUser: payload.toUser || "",
      time: payload.time,
      id: payload.id,
      seenByUsers: [],
      isGroupMsg: payload.isGroupMsg,
    });

    setMessages([...fromUserChat.msges]);
  };
  const handleCookie = ({ cookieName, access_token }) => {
    document.cookie = `${cookieName}=${access_token}`;
  };

  const findUserSeenIndex = (usersSeen, userToBeAdded) => {
    return usersSeen.findIndex((username) => {
      return userToBeAdded == username;
    });
  };

  const handleMsgSeen = (payload) => {
    const updatedMessageArray = messages?.map((messageObj) => {
      if (messageObj.id == payload.id) {
        const tempUserSeen = messageObj.seenByUsers;
        const result = findUserSeenIndex(tempUserSeen, payload.userSeen);
        if (result == -1) {
          tempUserSeen.push(payload.userSeen);
          socket.emit("msg:seen:update", {
            id: payload.id,
            seenByUsers: tempUserSeen,
            fromUser: payload.fromUser,
            toUser: payload.toUser,
          });
          return { ...messageObj, seenByUsers: tempUserSeen };
        }
      }
      return { ...messageObj };
    });
    setMessages(updatedMessageArray);
  };

  const handleMessageByUser = (payload) => {
    if (!personalChats[payload.toUser]) {
      personalChats[payload.toUser] = {
        msges: [],
      };
    }
    const toUserChat = personalChats[payload.toUser];
    toUserChat.msges.push({
      fromUser: payload.fromUser,
      message: payload.message,
      toUser: payload.toUser,
      seenByUsers: [],
      time: payload.time,
      id: payload.id,
      isGroupMsg: payload.isGroupMsg,
    });
    setMessages([...toUserChat.msges]);
  };

  const handleFetchChat = (payload) => {
    setPersonalChats(payload.chats);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    socket.emit("get:chat", {});
    socket.on("fetched:chat", handleFetchChat);
    return () => {
      socket.off("get:chat", {});
      socket.off("fetched:chat", handleFetchChat);
    };
  }, [message, chosenUser]);

  useEffect(
    () => {
      setMessages(personalChats[chosenUser]?.msges);
      socket.on("show:typing", handleShowTyping);
      socket.on("msg:from:user", handleMessageFromUser);
      socket.on("store:cookie", handleCookie);
      socket.on("msg:seen:show", handleMsgSeen);
      socket.on("msg:by:user", handleMessageByUser);

      document.addEventListener("click", handleClickOutside);
      return () => {
        socket.off("show:typing", handleShowTyping);
        socket.off("msg:from:user", handleMessageFromUser);
        socket.off("msg:by:user", handleMessageByUser);
        socket.off("msg:seen:show", handleMsgSeen);
        socket.off("store:cookie", handleCookie);

        document.removeEventListener("click", handleClickOutside);
      };
    },
    [chosenUser, message, messages],
    socket
  );

  const handleMessageInputChange = (e) => {
    setMessage(e.target.value);
    socket.emit("user:typing", {});
  };

  const handleEmojiOpenClose = () => {
    setOpenEmoji(!openEmoji);
  };

  const handleSubmit = () => {
    socket.emit("send:msg", {
      toUser: chosenUser,
      message,
      id: uuid(),
    });
    setMessage("");
  };
  const handleEmojiClick = ({ emoji }) => {
    setMessage((prev) => {
      return prev + emoji;
    });
  };
  return (
    <div className="bg-white  min-w-[350px] w-[100%] h-[92%] flex flex-col relative ">
      <UserHeader chosenUser={chosenUser} typingUser={typingUser} />
      <MessagesContainer messages={messages} state={state} />
      <MessageTypeContainer
        openEmojiRef={openEmojiRef}
        handleEmojiOpenClose={handleEmojiOpenClose}
        handleMessageInputChange={handleMessageInputChange}
        handleSubmit={handleSubmit}
        message={message}
      />
      {openEmoji && (
        <div ref={emojiRef} className=" absolute  bottom-[10%] right-10  ">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default Texts;
