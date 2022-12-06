import React from "react";
import SideBar from "../../components/sidebar/SideBar";
import SinglePost from "../singlePostDashBoard/SinglePost";
import "./single.css";
function Single() {
  return (
    <div className="single">
      {/* Post */}
      <SinglePost />
      <SideBar />
    </div>
  );
}

export default Single;
