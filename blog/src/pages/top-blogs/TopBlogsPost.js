import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBlogsPostCard from "./TopBlogsPostCard";



function TopBlogsPost() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:4000/blog/top-blogs", {
      method: "GET",
      hedaers: {
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
    navigate(`/show-all-posts/${_id}`);
  };
  if (loading) return <h2>Loading</h2>

  return(
    <>
        {
        posts.map((post, idx) => {
            return(
                <TopBlogsPostCard  singlePageHandler={singlePageHandler} post={post}/>
            )
        } )
    }
    </>

  )
}

export default TopBlogsPost;
