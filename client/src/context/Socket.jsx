import { createContext, useContext } from "react";
import io from 'socket.io-client';
import { useAuth } from "../context/Auth";

const storage = localStorage.socket_rooms_user
const user = storage ? JSON.parse(localStorage.socket_rooms_user) : null

const socket = io('http://localhost:3002', {
  query: {
    token: user?.token ,
  }
});

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
