import { useEffect, useState, useContext } from "react";

import ChatFolder from "../components/ChatFolder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TextMessageContainer from "../components/TextMessageContainer";
import { socketContext } from "../Providers/SocketContextProvider";
const Login = () => {
  const navigate = useNavigate();
  const [chosenUser, setChosenUser] = useState("Group chat");
  const { state } = useContext(socketContext);
  const { socket } = state;
  const [typingUser, setTypingUser] = useState("");
  const handleUserChoose = (username) => {
    setChosenUser(username);
  };
  const handleNotification = (username) => {
    toast.info(
      <div className="flex gap-1">
        <span className="font-bold ">{username}</span>has joined.
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  const handleCookieNotFound = (payload) => {
    toast.info(
      <div className="flex gap-1">
        <span className="font-bold ">{"Login"}</span>again.
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };
  const handleNotAuthUser = (payload) => {
    toast.info(
      <div className="flex gap-1">
        <span className="font-bold ">{"Login"}</span>to continue.
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  useEffect(() => {
    socket.emit("update:socketId", {});

    socket.on("user:noAuth", handleNotAuthUser);
    return () => {
      socket.off("user:noAuth", handleNotAuthUser);
    };
  }, []);
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden font-custom">
      <Navbar />
      <div className="w-full h-full flex bg-[#1976d2] ">
        <ChatFolder
          typingUser={typingUser}
          handleCookieNotFound={handleCookieNotFound}
          handleNotification={handleNotification}
          handleUserChoose={handleUserChoose}
        />
        <TextMessageContainer
          typingUser={typingUser}
          setTypingUser={setTypingUser}
          chosenUser={chosenUser}
        />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
