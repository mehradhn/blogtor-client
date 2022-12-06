import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { this_user, set_current_user } from "../../redux/UserSlice";
import Cookies from "universal-cookie";
import "./dashboard.css";
import {
  FaTh,
  FaPen,
  FaRegClipboard,
  FaHome,
  FaUserAlt,
  FaBars,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
function Dashboard({ children }) {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpoen] = useState(false);
  const token = cookies.get("token");
  const navigate = useNavigate();
  const toggle = () => setIsOpoen(!isOpen);
  const thisUser = useSelector(this_user);
  const dispatch = useDispatch()
  useEffect(() => {
    if (!thisUser) navigate("/sign-in");
    fetch("http://localhost:4000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
    }).then((response) => {
      response.json();
      setLoading(false);
    });
  }, []);

  const logOutHandler = (name) => {
    if (name === "LOG-OUT") {
      cookies.remove('token', {path:"/"})
      dispatch(set_current_user(null))}
  };
  const menuItem = [
    {
      path: "/dashboard/write",
      name: "Write",
      icon: <FaPen />,
    },
    {
      path: "/dashboard/my-posts",
      name: "Articles",
      icon: <FaRegClipboard />,
    },
    {
      path: "/dashboard/my-profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/",
      name: "LOG-OUT",
      icon: <MdLogout />,
    },
  ];
  if (loading) return <h2>loading</h2>;
  return (
    <div className="containter-dashboard">
      <div
        style={{ width: isOpen ? "250px" : "50px" }}
        className="sidebar-dashboard"
      >
        <div className="top_section-dashboard">
          <hl
            style={{ display: isOpen ? "block" : "none" }}
            className="logo-dashboard"
          >
            Panel
          </hl>
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className="bars-dashboard"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, idx) => {
          return (
            <NavLink
              to={item.path}
              key={idx}
              className="link"
              activeClassName="active"
              onClick={() => logOutHandler(item.name)}
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          );
        })}
      </div>
      <main className="main-outlet">
        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
