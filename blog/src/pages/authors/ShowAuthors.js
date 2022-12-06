import React, { useState, useEffect } from "react";
import "./showauthors.css";
import TopBar from "../../components/topbar/TopBar";
import AuthorCard from "./AuthorCard";
import { useNavigate } from "react-router-dom";

function ShowAuthors() {
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    fetch("http://localhost:4000/user/", {
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
  if(loading) return <h2>Loading</h2>


  return (
    <>
          <TopBar />
      <div  className="card-container">
        {authors &&
          authors.map((author, idx) => {
            return(
              <AuthorCard author={author}/>
            )
          })
        }
        </div>
    </>


  );
}

export default ShowAuthors;
