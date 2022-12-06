import React from "react";
import "./posts.css";
import TopBar from "../topbar/TopBar";
import Post from "../post/Post";
import './posts.css'
export default function Posts() {
  return (
    <>
    <TopBar />
      <div className="postpost">
        <Post />
      </div>
    </>
  );
}
