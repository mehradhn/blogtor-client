import React from "react";
import moment from "moment";
import { useRef } from "react";
import './TopBlogsPostCard.css'
function TopBlogsPostCard(props) {
  const content = useRef(null);
  if (content.current) {
    content.current.innerHTML = props.post.content;
    if (content.current.innerHTML.length > 40)
      content.current.innerHTML =
        content.current.innerHTML.slice(0, 40) + "...";
  }
  return (
    <div
      onClick={() => props.singlePageHandler(props.post._id)}
      className="post"
    >
      <img
        src={props.post.imgurl}
        alt="image-post"
        className="postImg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/asset/images/pexels-guillaume-meurice-1591447.jpg";
        }}
      />
      <div className="postInfo">
        <div className="postCats">
          {/* <span className="postCat">Author: {props.post.creator.username}</span> */}
        </div>
        <span className="postTitle">{props.post.title}</span>
        <hr />
        <span className="postDate">
          Published:{" "}
          {/* {moment(props.post.creator.createdAt).utc().format("YYYY-MM-DD")} */}
        </span>
        <span className="postDate">
          Last updated:{" "}
          {/* {moment(props.post.creator.updatedAt).utc().format("YYYY-MM-DD")} */}
        </span>
      </div>
      <p className="postDesc">
        <span ref={content}></span>
      </p>
    </div>
  );
}

export default TopBlogsPostCard;
