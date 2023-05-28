import io from 'socket.io-client';
import { createContext, useContext } from "react";

const socket = io.connect('http://localhost:3002');
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
