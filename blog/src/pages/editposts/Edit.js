import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Cookies from "universal-cookie";

export default function Edit() {
  const params = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [content, setContent] = useState();
  const [id, setId] = useState();
  const editorRef = useRef();
  const cookies = new Cookies();

  const titlePostHandler = (event) => setTitle(event.target.value);
  const urlPostHandler = (event) => setUrl(event.target.value);
  useEffect(() => {
    fetch(`http://localhost:4000/blog/single-blog/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setId(data._id);
        setTitle(data.title);
        setUrl(data.imgurl);
        setContent(data.content);
        setPost(post);
        // console.log(post)
        setLoading(false);
      });
  }, []);

  const editHandler = () => {
    fetch("http://localhost:4000/blog/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        blogId: id,
        data: {
          title: title,
          content: content,
          imgurl: url,
        },
      }),
    })
      .then((response) => response.json())

      .then((data) => {
        setLoading(false);
        // console.log(data);
        // console.log(data);
      });
      navigate('/dashboard/my-posts')
  };

  if (loading) return <h2>loading</h2>;
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
            initialValue={content}
            init={{
              menubar: false,
            }}
          />
        </div>
      </div>
      <button onClick={editHandler} className="writeSubmit">
        Publish
      </button>
    </>
  );
}
