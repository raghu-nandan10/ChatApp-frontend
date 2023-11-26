import React, { useContext, useEffect, useState } from "react";
import { socketContext } from "../Providers/SocketContextProvider";

import UserItem from "./UserItem";
import SearchInput from "./SearchInput";
import UserItemSkeleton from "./UserItemSkeleton";

const ChatFolder = ({
  handleNotification,
  handleUserChoose,
  handleCookieNotFound,
  typingUser,
}) => {
  const [users, setUsers] = useState([]);
  const { state, dispatch } = useContext(socketContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { socket } = state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetchUsers = (usersFetched) => {
      setLoading(false);
      if (searchQuery == "") {
        usersFetched?.userDB?.push({ username: "Group chat" });
        setUsers(usersFetched.userDB);
      }
      if (usersFetched.newUser) {
        handleNotification(usersFetched.newUsername);
      }
    };

    const handleSetCurrentUser = (payload) => {
      dispatch({
        type: "UPDATE_CURRENT_USER",
        currentUser: payload.currentUser,
      });
    };
    if (searchQuery == "") {
      socket.emit("users:get", {});
      setLoading(true);
    }

    socket.on("currentUser:fetch", handleSetCurrentUser);
    socket.on("users:fetched", handleFetchUsers);
    socket.on("cookie:notFound", handleCookieNotFound);

    return () => {
      socket.off("currentUser:fetch", handleSetCurrentUser);
      socket.off("users:fetched", handleFetchUsers);
      socket.off("cookie:notFound", handleCookieNotFound);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value;
    setUsers((prev) => {
      return users.filter((user, index) => {
        return user.username.toLowerCase().includes(query.toLowerCase());
      });
    });
  };
  return (
    <div className=" bg-white min-w-[320px] overflow-y-scroll max-h-[92%]  p-3 w-[20%]   h-fit     border">
      <SearchInput
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
      />
      <div className="text-blue-400 p-2 font-bold ">Users</div>
      {users &&
        users.map((user, index) => {
          return (
            <UserItem
              typingUser={typingUser}
              currentUser={state.currentUser}
              handleUserChoose={handleUserChoose}
              username={user.username}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default ChatFolder;
