import React, { useRef, useState } from "react";
import "./write.css";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Write() {
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const editorRef = useRef();
  const titlePostHandler = (event) => setTitle(event.target.value);
  const urlPostHandler = (event) => setUrl(event.target.value);
  const postSubmitHandler = () => {
    fetch("http://localhost:4000/blog/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        title: title,
        content: editorRef.current.getContent(),
        imgurl: url,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "ok") {
          navigate("/dashboard");
        } else {
          return alert("Please Fill all blanks");
        }
      });
  };
  return (
    <>
      <div className="posts">
        <input
          value={title}
          onChange={titlePostHandler}
          className="titlePost"
          type="text"
          placeholder="title"
        />
        <input
          value={url}
          onChange={urlPostHandler}
          className="titlePost"
          type="text"
          placeholder="please Enter url"
        />
        <div className="editor">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              max_chars: 200,
              menubar: false,
            }}
          />
        </div>
      </div>
      <button onClick={postSubmitHandler} className="writeSubmit">
        Publish
      </button>
    </>
  );
}

export default Write;
