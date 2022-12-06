import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import TopBlogsPost from "./TopBlogsPost";
import './TopBlogs.css'
function TopBlogs() {
  return (
    <>
      <TopBar />
      <div className="top-blogs">
        <TopBlogsPost />
      </div>
    </>
  );
}

export default TopBlogs;
