import { createContext, useEffect, useContext, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(
    () => {
      let storage = localStorage.socket_rooms_user;
      if (storage) {
        storage = JSON.parse(storage)
        setUser(storage);
      }
    },
    [],
  )



  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={{ pathname: "/login", state: { from: location } }}
        replace={true}
      />
    );
  }

  return <Outlet />;
};
