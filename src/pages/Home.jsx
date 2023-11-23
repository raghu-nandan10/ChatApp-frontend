import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { socketContext } from "../Providers/SocketContextProvider";
import Input from "../components/Input";
import ButtonUi from "../components/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import ButtonOutlinedUi from "../components/ButtonOutlinedUi";

const Home = () => {
  const { state, dispatch } = useContext(socketContext);
  const { socket } = state;
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const handleReceiveRes = (payload) => {
      setLoading(false);
      navigate("/chat");
    };
    const handleCookie = ({ cookieName, access_token }) => {
      document.cookie = `${cookieName}=${access_token}`;
    };
    const handleUserAlreadyExists = ({ username }) => {
      setIsValid(false);
      toast.info(
        <div className="flex gap-1">
          <span className="font-bold ">{username}</span>already exists
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
      setLoading(false);
    };
    const handleLoginFailed = ({ username, message }) => {
      setIsValid(false);
      toast.info(
        <div className="flex gap-1">
          <span className="font-bold ">{message}</span>
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
      setLoading(false);
    };
    //listening events from backend
    socket.on("creation:true", handleReceiveRes);
    socket.on("store:cookie", handleCookie);
    socket.on("user:exists", handleUserAlreadyExists);
    socket.on("user:login:failed", handleLoginFailed);
    socket.on("user:login:successfull", handleReceiveRes);
    socket.on("user:loggedIn", handleReceiveRes);

    //emitting events from frontend
    // socket.emit("token:validate", {});

    return () => {
      socket.off("creation:true", handleReceiveRes);
      // socket.off("store:cookie", handleCookie);
      socket.off("user:exists", handleUserAlreadyExists);
      socket.off("user:login:failed", handleLoginFailed);
      socket.off("user:loggedIn", handleReceiveRes);
    };
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    socket.emit("user:signup", { formData });
  };

  const handleLoginSubmit = () => {
    setLoading(true);
    socket.emit("user:login", { formData });
  };
  return (
    <div className="w-[100vw] h-[100vh] ">
      <Navbar />
      <div className="w-[100vw] h-[80vh] center ">
        <div className="min-w-[320px] center flex-col gap-4">
          <Input
            name="username"
            label="Username"
            type={""}
            isValid={isValid}
            handleInputChange={handleInputChange}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            isValid={isValid}
            handleInputChange={handleInputChange}
          />
          <ButtonUi buttonName={"Create account"} handleSubmit={handleSubmit} />
          <ButtonOutlinedUi
            buttonName={"Login"}
            handleloginsubmit={handleLoginSubmit}
          />
        </div>
      </div>
      {loading && <Loader />}
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

export default Home;
