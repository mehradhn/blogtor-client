import React from "react";
import "./sideBar.css";
function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src={"/asset/images/unknown.jpg"} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          incidunt voluptatum porro possimus rem assumenda placeat, recusandae
        </p>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            <li className="sidebarListItem">Life</li>
            <li className="sidebarListItem">Music</li>
            <li className="sidebarListItem">Style</li>
            <li className="sidebarListItem">Cinema</li>
            <li className="sidebarListItem">Tech</li>
            <li className="sidebarListItem">Sport</li>
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-instagram"></i>
            <i className="sidebarIcon fa-brands fa-twitter"></i>
            <i className="sidebarIcon fa-brands fa-telegram"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
