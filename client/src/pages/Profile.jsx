import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/Auth";

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logout = useCallback(
    (e) => {
      e.preventDefault();
      setUser(null);
      localStorage.removeItem("socket_rooms_user");
      navigate("/");
    },
    [setUser]
  );

  return (
    <div>
      <h1>Profile page</h1>
      <p>
        Hello <strong>{user?.username}</strong>!
      </p>
      <p>
        Access token : <strong>{user?.token}</strong>!
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
