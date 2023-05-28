import { useState } from "react";
import { useAuth } from "../context/Auth";
import Chat from "../components/Chat";
import { SocketProvider } from "../context/Socket";

const Home = () => {
  const { user, setUser } = useAuth();
  return (
    <div>
      <h3>Hello {user?.username}, une petite envie de discuter ?</h3>
      <SocketProvider>
        <Chat />
      </SocketProvider>
    </div>
  );
};

export default Home;
