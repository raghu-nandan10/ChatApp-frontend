import React, { useContext, useEffect, useState } from "react";
import { socketContext } from "../Providers/SocketContextProvider";

import UserItem from "./UserItem";
import SearchInput from "./SearchInput";

const ChatFolder = ({ handleNotification, handleUserChoose }) => {
  const [users, setUsers] = useState([]);
  const { state, dispatch } = useContext(socketContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { socket } = state;

  useEffect(() => {
    const handleFetchUsers = (usersFetched) => {
      if (searchQuery == "") {
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
    }
    socket.on("currentUser:fetch", handleSetCurrentUser);
    socket.on("users:fetched", handleFetchUsers);

    return () => {
      socket.off("currentUser:fetch", handleSetCurrentUser);
      socket.off("users:fetched", handleFetchUsers);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value;
    setUsers((prev) => {
      return users.filter((user, index) => {
        console.log(
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log(user.username + " " + searchQuery);
        return user.username.toLowerCase().includes(query.toLowerCase());
      });
    });
  };
  return (
    <div className=" bg-gray-50 min-w-[320px]  p-3 w-[20%] rounded-3xl rounded-l-none  h-fit     border">
      <SearchInput
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
      />
      <div className="text-blue-400 p-2 font-bold ">Users</div>
      {users &&
        users.map((user, index) => {
          return (
            <UserItem
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
