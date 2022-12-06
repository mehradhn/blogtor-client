import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import './TopBlogers.css'
import TopBlogersCard from "./TopBlogersCard";

function TopBlogers() {
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState();
  useEffect(() => {
    fetch("http://localhost:4000/user/top-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setAuthors(data)
        setLoading(false)
      });
  }, []);
  if (loading) return <h2>Loading</h2>;

  return <>
    <TopBar/>
    <div  className="card-container">
        {authors &&
          authors.map((author, idx) => {
            return(
              <TopBlogersCard author={author}/>
            )
          })
        }
        </div>
  </>;
}

export default TopBlogers;
