import React, {useRef} from "react";
function PostCard(props) {

  const content = useRef(null)
if(content.current) {
    content.current.innerHTML = props.item.content
    if(content.current.innerHTML.length > 40)
    content.current.innerHTML = content.current.innerHTML.slice(0, 40) + "..."
}

  return (
          <div onClick={() => props.singlePageHandler(props.item._id)} className="post">
            <img
              src={props.item.imgurl}
              alt="image-post"
              className="postImg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "/asset/images/pexels-guillaume-meurice-1591447.jpg";
              }}
            />
            <div className="postInfo">
              <span className="postTitle">{props.item.title}</span>
              <hr />
            </div>
            <p className="postDesc">

                <span ref={content}></span>

            </p>
            
          </div>
  );
}

export default PostCard;
