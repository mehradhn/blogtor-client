import React from "react";
import { useNavigate } from "react-router-dom";
import './TopBlogers.css'
function TopBlogersCard(props) {
  const navigate = useNavigate();
  if (props.author.bio === "") {
    props.author.bio += " ";
  } else {
    if (props.author.bio > 40)
      props.author.bio = props.author.bio.slice(0, 40) + "...";
  }
  const navigateToPosts = (username, id) => {
    navigate(`/authors/${props.author.name}/posts/${id}`);
  };
  return (
    <div>
      <div
        onClick={() => navigateToPosts(props.author.name, props.author._id)}
        className="card"
      >
        <img
          src={"http://localhost:4000/" + props.author.avatar}
          alt="profileImage"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/asset/images/unknown.jpg";
          }}
          className="image-user-profile"
        />
        <p className="card-author-name">{props.author.name}</p>
        <p className="card-author-job">Skills: React</p>
        <hr className="card-hr" />
        <p className="card-author-bio">
          <strong>Bio: </strong>
          <span>{props.author.bio}</span>
        </p>
      </div>
    </div>
  );
}

export default TopBlogersCard;
