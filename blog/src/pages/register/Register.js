import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_current_user, this_user } from "../../redux/UserSlice";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
// import {Register as RegisterImage} from '../../../public/asset/images/Register.jpeg'

function Register() {
  const thisUser = useSelector(this_user);

  useEffect(() => {
    if (thisUser) navigate("/dashboard");
  }, []);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const nameChangeHandler = (event) => setName(event.target.value);
  const usernameChangeHandler = (event) => setUsername(event.target.value);
  useEffect(() => {
    if (thisUser) return navigate(`/dashboard`);
  }, []);

  const cookies = new Cookies();
  const submitHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          if (data.token) {
            cookies.set("token", data.token, { path: "/" });
            fetch("http://localhost:4000/user/me", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                auth: `ut ${data.token}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                dispatch(set_current_user(data));
                navigate("/dashboard");
              });
          }
          cookies.set("token", data.token, { path: "/" });
          navigate("/dashboard");
        } else {
          return alert("somethings is wrong");
        }
      });
  };

  return (
    <div className="Register">
      <span className="RegisterTitle">Register</span>
      <form onSubmit={submitHandler} className="RegisterForm">
        <label>Name</label>
        <input
          className="RegisterInput"
          type="text"
          placeholder="Enter your username..."
          onChange={nameChangeHandler}
          value={name}
        />
        <label>Username</label>
        <input
          className="RegisterInput"
          type="text"
          placeholder="Choose unique username..."
          onChange={usernameChangeHandler}
          value={username}
        />
        <button className="RegisterButton">Register</button>
      </form>
      <button className="RegisterLoginButton">
        <Link to={"/sign-in"}>SignIn</Link>
      </button>
      <button className="HomeButton">
        <Link to={"/"}>Home</Link>
      </button>
    </div>
  );
}

export default Register;
