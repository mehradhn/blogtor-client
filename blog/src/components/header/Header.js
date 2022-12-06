import React from "react";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">imagination more important than knowledge</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="/asset/images/pexels-photo-1167355.jpg"
        alt=""
      />
    </div>
  );
}

export default Header;
