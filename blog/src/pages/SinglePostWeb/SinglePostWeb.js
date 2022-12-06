import React, { useEffect, useState, useRef } from "react";
import TopBar from "../../components/topbar/TopBar";
import { useParams } from "react-router-dom";
import moment from "moment";
import ReactStars from "react-stars";
import "./singlepostWeb.css";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { set_current_user, this_user } from "../../redux/UserSlice";
import userEvent from "@testing-library/user-event";

function SinglePostWeb() {
  const dispatch = useDispatch();
  const thisUser = useSelector(this_user);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [comment, setComment] = useState();
  const [preComments, setPreComment] = useState();
  const [singlepost, setSinglePost] = useState();
  const [loading, setLoading] = useState(true);
  const[rate, setRate] = useState()
  const params = useParams();
  const content = useRef(null);
  if (content.current) {
    content.current.innerHTML = singlepost.content;
  }
  const rateBlog = (newRating) => {
    setRate(newRating);
    fetch("http://localhost:4000/blog/submit-rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body:JSON.stringify({
        blogId: params.id, // the id of the blog which u want to submit a score,
        score: rate // the actual score u want to give: 1-5
      }) 
    }).then(response => response.json())
    .then(data => {
      // console.log(data)
      get_blog()
    })
  };

  const fetch_comment = () => {
    fetch(`http://localhost:4000/comment/by-blog/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setPreComment(data);
      });
  };

  const get_blog = () => {
    fetch(`http://localhost:4000/blog/single-blog/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSinglePost(data);
        fetch_comment();
        setLoading(false);
      });
  }

  useEffect(() => {
    get_blog()
  }, []);

  const addCommentHandler = (id) => {
    fetch("http://localhost:4000/comment/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
        text: comment,
        blogId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComment("");
        fetch_comment();
        // rateBlog();
        setLoading(false);
      });
  };

  // console.log(preComments);

  if (loading) return <h2>Loading</h2>;
  return (
    <>
      <TopBar />
      <div className="container">
        <div className="imageurl">
          <img
            src={singlepost.imgurl}
            alt=""
            className="imgtag"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "/asset/images/pexels-guillaume-meurice-1591447.jpg";
            }}
          />
        </div>
        <div className="title">{singlepost.title}</div>
        <div className="content" ref={content}></div>
        {singlepost.averageScore && (<p>rate is: {singlepost.averageScore}</p>)}
        {!singlepost.averageScore && (<p>at now there is no rate</p>)}

        <div className="rate">
          {thisUser && (
            <ReactStars
              count={5}
              onChange={rateBlog}
              size={24}
              color2={"#ffd700"}
            />
          )}
        </div>

        {thisUser && (
          <>
            <div className="comment-secotion">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="text-area-comment"
              ></textarea>
              <button
                onClick={() => addCommentHandler(params.id)}
                className="button-comment"
              >
                Add a Comment
              </button>
            </div>
          </>
        )}
        <div className="comments">
          {preComments &&
            preComments.map((cm, idx) => {
              return (
                <div className="comment">
                  <img
                    src={"http://localhost:4000/" + cm.user.avatar}
                    alt="image-comment"
                  />{" "}
                  {cm.user.username}: {cm.text}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SinglePostWeb;
