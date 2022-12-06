import React, { useEffect, useState, useRef } from "react";
import "./singlePost.css";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import moment from "moment";
function SinglePost() {

  const cookies = new Cookies();
  const [singlepost, setSinglePost] = useState();
  const [noposts, setNoPosts] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const content = useRef(null)

  useEffect(() => {
    fetch(`http://localhost:4000/blog/single-blog/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSinglePost(data);
        // console.log(data);
        setLoading(false);
        if(content.current)
        content.current.innerHTML = data.content
      });
  }, []);
  if (loading) return <h2>Loading</h2>;

  const deleteHandler = (id) => {
    console.log(id);
    fetch("http://localhost:4000/blog/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({ blogId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/dashboard");
      });
  };
  const editHandler = (id) => {
    navigate(`/dashboard/my-posts/edit/${params.id}`);
  };

  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          <img
            src={singlepost.imgurl}
            alt=""
            className="singlePostImg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "/asset/images/pexels-guillaume-meurice-1591447.jpg";
            }}
          />
          <h1 className="singlePostTitle">
            {singlepost.title}
            <div className="singlePostEdit">
              <i
                onClick={() => editHandler(singlepost._id)}
                className="singlePostIcon far fa-edit"
              ></i>
              <i
                onClick={() => deleteHandler(singlepost._id)}
                className="singlePostIcon far fa-trash-alt"
              ></i>
            </div>
          </h1>
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:<strong>{singlepost.creator.username}</strong>
            </span>
            <span className="singlePostDate">
              {moment(singlepost.creator.updatedAt).utc().format("YYYY-MM-DD")}
            </span>
          </div>
          <p className="singlePostDesc">
            <div ref={content}></div>

          </p>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
