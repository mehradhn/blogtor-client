import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { set_current_user, this_user } from "../../redux/UserSlice";

import "./MyProfile.css";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

function MyProfile() {
  const cookies = new Cookies();
  const thisUser = useSelector(this_user);
  const token = cookies.get("token");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [name, setName] = useState();
  const dispatch = useDispatch();
  const editorRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const[bio, setBio] = useState()

  useEffect(() => {
    fetch("http://localhost:4000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBio(data.bio)
        setFile(data.avatar)
        setUserData(data);
        setName(data.name);
        setLoading(false);
      });
  }, []);

    const submitAvatar = async (event) => {

    
    try {
      if (!file) return console.log('hey');;

      console.log(file);

      const formData = new FormData();
      formData.append("avatar", file);

      fetch("http://localhost:4000/user/update-avatar", {
        method: "POST",
        headers: {
          auth: `ut ${token}`,
        },
        body: formData,
      }).then((res) => {
        console.log(res);
        return res.json()
      }).then(data => console.log(data))
    } catch (error) {
      console.log("lol");
    }
  };

  useEffect(() => {
    console.log("second useeffect cvalled")
    submitAvatar()
  } , [file])

  if (loading) return <h2>Loading</h2>;

  const uploadFileHandler = (event) => {
    document.getElementById("imgupload").click();
  };




  const editProfileHandler = () => {
    fetch("http://localhost:4000/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
        name: name,
        bio: bio,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "ok") navigate("/dashboard");
        else {
          return alert("something is wrong");
        }
      });
  };
  return (
    <>
      <div className="profile">
        <div className="profile-image">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="imgupload"
            style={{ display: "none" }}
          />
          <img
            onClick={uploadFileHandler}
            src={"http://localhost:4000/" + file}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/asset/images/unknown.jpg";
            }}
            alt="avatar"
          />
        </div>
        {/* <button onClick={uploadFileHandler}><i class="fa fa-upload" aria-hidden="true"></i></button> */}
        <div className="profile-name">
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>

          {/* <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={userData.bio}
            init={{
              menubar: false,
            }}
          /> */}
          <textarea className="textarea" value={bio} onChange={(e) => setBio(e.target.value)} name="bio" id="bio" cols="30" rows="10">

          </textarea>
      </div>
      <button onClick={editProfileHandler} className="edit-profile-submit">
        SAVE
      </button>
    </>
  );
}

export default MyProfile;
