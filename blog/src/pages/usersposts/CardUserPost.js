import React, {useRef} from 'react'
import moment from "moment";
import ReactStars from 'react-stars'
import './CardUserPost.css'
function CardUserPost(props) {
    const content = useRef(null);
    if (content.current) {
      content.current.innerHTML = props.post.content;
      if (content.current.innerHTML.length > 40)
        content.current.innerHTML = content.current.innerHTML.slice(0, 40) + "...";
    }
  return (
    <div onClick={() => props.singlePageHandler(props.post._id)} className="post-card">
      <img
        src={props.post.imgurl}
        alt="image-post"
        className="postImg-card"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/asset/images/pexels-guillaume-meurice-1591447.jpg";
        }}
      />
      <div className="postInfo-card">
        <span className="postTitle">{props.post.title}</span>
        <hr />
      </div>
      <p className="postDesc-card">

        <span ref={content}></span>
        
      </p>

    </div>
  )
}

export default CardUserPost