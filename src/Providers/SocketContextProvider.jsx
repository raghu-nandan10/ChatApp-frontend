import { createContext, useReducer } from "react";
import { io } from "socket.io-client";

const initialState = {
  socket: null,
  currentUser: null,
};

export const socketContext = createContext(initialState);

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "SET_SOCKET":
      return { ...state, socket: action.payload };
    case "UPDATE_CURRENT_USER":
      state.currentUser = action.currentUser;
      return state;
    default:
      return state;
  }
};

const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  if (!state.socket) {
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
      extraHeaders: {
        cookie: document.cookie,
      },
    });
    dispatch({ type: "SET_SOCKET", payload: socket });
  }
  return (
    <socketContext.Provider value={{ state, dispatch }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketContextProvider;
