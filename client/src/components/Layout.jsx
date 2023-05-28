import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";
const Layout = () => {


  const { user, setUser } = useAuth();

  return (

    <div>
      {user ?
        <>
          <ul>
            <li>
              <Link to="/">Chat</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </>
        :
        <>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </>

      }
      <Outlet />
    </div>
  )
}

export default Layout;
