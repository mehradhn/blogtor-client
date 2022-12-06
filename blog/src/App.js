import React, { useEffect, useState} from "react";
import Home from "./pages/home/Home";
import Write from "./components/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MyPosts from "./pages/myposts/MyPosts";
import Posts from "./components/posts/Posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weblayout from "./pages/weblayout/Weblayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Cookies from "universal-cookie";
import { set_current_user, this_user} from "./redux/UserSlice";
import { useDispatch} from "react-redux";
import SinglePost from "./pages/singlePostDashBoard/SinglePost";
import Edit from "./pages/editposts/Edit";
import { useSelector } from "react-redux";
import SinglePostWeb from "./pages/SinglePostWeb/SinglePostWeb";
import MyProfile from "./pages/my-profile/MyProfile";
import ShowAuthors from "./pages/authors/ShowAuthors";
import UsersPosts from "./pages/usersposts/UsersPosts";
import WelcomeDashBoard from "./pages/dashboard/WelcomeDashBoard";
import TopBlogers from "./pages/top-blogers/TopBlogers";
import TopBlogs from "./pages/top-blogs/TopBlogs";


function App() {
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const dispatch = useDispatch();
  const thisUser = useSelector(this_user);


  useEffect(() => {
    if(!token) return setLoading(false)
    fetch("http://localhost:4000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(set_current_user(data));
        setLoading(false);
      });
  }, []);
  if (loading) return <h2>Loading</h2>;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weblayout />}>
          <Route path="" element={<Home />} />
          <Route path="/post/:id" element={<SinglePostWeb/>} />
          <Route path="authors" element={<ShowAuthors/>} />
          <Route path="authors/:name/posts/:id" element={<UsersPosts/>} />
          <Route path="sign-up" element={<Register />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="show-all-posts" element={<Posts />} />
          <Route path="show-all-posts/:id" element={<SinglePostWeb/>} />
          <Route path="top-blogs" element={<TopBlogs/>} />
          <Route path="top-blogers" element={<TopBlogers/>} />
        </Route>
        <Route path="/dashboard/" element={<Dashboard />}>
        <Route path="" element={<WelcomeDashBoard />}/>
          <Route path="write" element={<Write />} />
          <Route path="my-posts" element={<MyPosts/>} />
          <Route path="my-posts/:id" element={<SinglePost/>} />
          <Route path="my-posts/edit/:id" element={<Edit/>} />
          <Route path="my-profile" element={<MyProfile/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
