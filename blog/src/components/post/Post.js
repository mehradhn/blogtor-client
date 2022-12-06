import React, { useEffect, useState } from "react";
import "./post.css";
import moment from "moment";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
function Post() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState();
  const [noposts, setNoPosts] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    fetch("http://localhost:4000/blog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        setLoading(false);
      });
  }, []);
  const singlePageHandler = (_id) => {
    navigate(`/show-all-posts/${_id}`)
  }
  if (loading) return loading;
  return (
    <>
      {posts.map((post, idx) => {
        return(
          <Card  singlePageHandler={singlePageHandler} post={post}/>
        )
      })}
    </>
  );
}

export default Post;
