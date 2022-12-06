import React from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import Posts from "../../components/posts/Posts";
import TopBar from "../../components/topbar/TopBar"
function Home() {
  return (
    <React.Fragment>
      <TopBar/>
      <Header />
      <div className="home">
        {/* <Posts /> */}
      </div>
    </React.Fragment>
  );
}

export default Home;
