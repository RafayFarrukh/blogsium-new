import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Context } from "../context/Context";
import Navbar from "../components/Navbar";
const Create = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      // fetch("http://localhost:5000/api/articles/create", {
      //   // fetch("/api/articles/create", {
      //   method: "post",

      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "token" + localStorage.getItem("jwt"),
      //   },

      //   // },

      //   body: JSON.stringify({
      //     username: user.username,
      //     title,
      //     body,
      //     pic: url,
      //   }),
      // })
      const newPost = {
        username: user.username,
        title: title,
        body: body,
        pic: url,
      };
      axios
        .post("http://localhost:5000/api/articles/create", newPost)
        // .post("/api/articles/create", newPost)
        // .then((res) => res.json())
        .then((data) => {
          // console.log(user.username);
          console.log(data);
          navigate("/blogs");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "blogsium");
    data.append("cloud_name", "dwgehqnsz");
    fetch("https://api.cloudinary.com/v1_1/dwgehqnsz/image/upload/", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      {file && (
        <img
          className="uploadedImage h-96 w-96 mt-10 mr-10 float-right"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      {/* <form onSubmit={handlePost}> */}
      <form onSubmit={postDetails}>
        <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
          <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
            <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">
              Create Article
            </h1>
            <div className="space-y-4">
              <div>
                <label for="title" className="text-lx font-serif">
                  Title:
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="title"
                  id="title"
                  className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label for="title" className="text-lx font-serif">
                  Image:
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => setFile(e.target.files[0])}
                  placeholder="file"
                  filename="articleImage"
                  // style={{ display: "none" }}
                  className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label for="body" className="block mb-2 text-lg font-serif">
                  body:
                </label>
                <textarea
                  id="body"
                  cols="30"
                  rows="10"
                  //   value={body}
                  onChange={(e) => setbody(e.target.value)}
                  placeholder="Write here.."
                  className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                ></textarea>
              </div>

              <button
                className=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600"
                // onClick={() => postDetails()}
              >
                POST
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
