import React, { useEffect, useState, useRef } from "react";
import "./MyPosts.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

function MyPosts() {
  let regex = /(<([^>]+)>)/gi;
  const navigate = useNavigate()
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [posts, setPosts] = useState(null);
  const [noposts, setNoPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/blog/my-blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setNoPosts(data);
        } else {
          console.log(data);
          setPosts(data);
        }
      }).then(() => setLoading(false));
  }, []);

  if (loading) return <h2>Loading</h2>
  
  const singlePageHandler = (_id) => {
    navigate(`./${_id}`)
  }


  return (
    <>
      {noposts && <h1>at now you don't have any posts</h1>}
      {posts &&
      <div className="postpost">
        {
        posts.map((item, idx) => {
          console.log(item.content)
          
        
          return (
            <PostCard  singlePageHandler={singlePageHandler} item={item}/>
          );
        })
        
        }
        </div>}
    </>
  );
}

export default MyPosts;
