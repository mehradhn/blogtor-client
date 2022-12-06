import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { set_current_user, this_user } from "../../redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const thisUser = useSelector(this_user);
  useEffect(() => {
    if (thisUser) navigate("/dashboard");
  }, []);

  const [username, setUsername] = useState();
  const [password, setPaswword] = useState();
  const dispatch = useDispatch();

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const navigate = useNavigate();

  const passwordChangeHandler = (event) => {
    setPaswword(event.target.value);
  };
  const cookies = new Cookies();
  const submitHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
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
        } else {
          return alert("username or password is wrong");
        }
      });
  };

  return (
    <div className="Login">
      <span className="LoginTitle">Login</span>
      <form onSubmit={submitHandler} className="LoginForm">
        <label>Username</label>
        <input
          className="LoginInput"
          type="text"
          placeholder="Enter your username..."
          onChange={usernameChangeHandler}
          value={username}
        />
        <label>Passwprd</label>
        <input
          className="LoginInput"
          type="password"
          placeholder="your password is 1111 =) "
          onChange={passwordChangeHandler}
          value={password}
        />
        <button className="LoginButton">Login</button>
      </form>
      <button className="LoginRegisterButton">
        <Link to={"/sign-up"}>Register</Link>
      </button>
      <button className="HomeButton">
        <Link to={"/"}>Home</Link>
      </button>
    </div>
  );
}

export default Login;
