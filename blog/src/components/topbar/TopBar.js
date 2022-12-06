import React, {useState, useEffect} from "react";
import "./TopBar.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch , useSelector} from "react-redux";
import { set_current_user, this_user} from "../../redux/UserSlice";

function TopBar() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const[loading, setLoading] = useState(true)
  const[avatar, setAvatar] = useState()
  
  const thisUser = useSelector(this_user);

  useEffect(() => {
    fetch("http://localhost:4000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
    }).then(response => response.json())
    .then(data => {
      // console.log(data)
      setAvatar(data.avatar)
      setLoading(false)
    })


  }, [])





  
  
  const logOutHandler = () => {
    cookies.remove('token',{path:"/"})
   dispatch(set_current_user(null))
  }
  if(loading) return <h2>Loading</h2>
  return (
    <React.Fragment>
      <div className="top">
        <div className="topLeft">
          <i className="topIcon fa-brands fa-instagram"></i>
          <i className="topIcon fa-brands fa-twitter"></i>
          <i className="topIcon fa-brands fa-telegram"></i>
        </div>
        <div className="topCenter">
          <ul className="topList">
            {/* <li className="topListItem"><Link to="">HOME</Link></li> */}
           {!thisUser && <li className="topListItem"><Link to={"/sign-up"}>SIGN-UP</Link></li>}
           {thisUser && <li className="topListItem"><Link to={"/dashboard"}>DASHBOARD</Link></li>}
           <li className="topListItem"><Link to={"/show-all-posts"}>ALLPOSTS</Link></li>
           <li className="topListItem"><Link to={"/"}>HOME</Link></li>
             <li className="topListItem"><Link to={"/authors"}>AUTHORS</Link></li>
            {thisUser && <li onClick={logOutHandler} className="topListItem"><Link to="/">LOGOUT</Link></li>}
          <li className="topListItem"><Link to={"/top-blogers"}>TOP AUTHORS</Link></li>
          <li className="topListItem"><Link to={"/top-blogs"}>TOP BLOGS</Link></li>
          </ul>
        </div>
        <div className="topRight">
         {thisUser && <img className="topImg" src={"http://localhost:4000/" + avatar} alt="" />}
        </div>
      </div>
    </React.Fragment>
  );
}

export default TopBar;
