import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import DeleteIcon from "@mui/icons-material/Delete";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
const SingleArticle = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const [updateMode, setupdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/articles/" + path);
      // const res = await axios.get("/api/articles/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setbody(res.data.body);
      console.log(res.data);
      // console.log(res.data.body);
    };
    window.scrollTo(0, 0);

    getPost();
  }, [path]);

  const deletePost = async () => {
    await axios
      // .delete(`http://localhost:5000/api/articles/delete/${path}`, {
      .delete(`/api/articles/delete/${path}`, {
        data: { username: user.username },
      })
      .then(() => navigate("/blogs"))
      .catch(() => console.log("error in deletePost"));
  };
  const updatePost = async () => {
    await axios
      // .put(`http://localhost:5000/api/articles/update/${path}`, {
      .put(`/api/articles/update/${path}`, {
        username: user.username,
        title,
        body,
      })
      .then(() => setupdateMode(false))
      .catch(() => console.log("error in updatePost"));
  };

  const ImageLink = "";

  // const ImageLink = "/images/";
  return (
    <div className="flex-col items-center justify-center ">
      <div className="flex-col items-center justify-center   max-w-2xl rounded overflow-hidden shadow-lg lg:ml-96 my-24 ">
        {/* <div className="items-center mx-96 my-24  max-w-2xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-200 dark:border-gray-400 shadow"> */}
        <div>
          {post.image && (
            <img
              className="postImage   w-full"
              src={ImageLink + post.image}
              // src={post.image}
              alt="mmmmmmm"
            />
          )}
        </div>
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="postTitleEdit"
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="postTitle  mb-2 text-2xl m-4 font-bold tracking-tight text-gray-900 dark:text-black">
            {title}
            {user?.username === post.username && (
              <div className="EditButtons ">
                <ModeEditIcon
                  className="float-right hover:cursor-pointer mx-3"
                  onClick={() => setupdateMode(true)}
                />
                <DeleteIcon
                  onClick={deletePost}
                  className="float-right hover:cursor-pointer"
                />
              </div>
            )}
          </h1>
        )}

        <div className="PostInfo mt-4 mb-4">
          <span>
            Author : &#160; &#160;
            {/* <Link to={`/?user=${post.username}`} className="link"> */}
            <b className="author">{post.username}</b>
            {/* <b className="author">{user.username}</b> */}
            {/* </Link> */}
          </span>
          <span className="Date float-right m-2 text-orange-500">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <input
            value={body}
            className="postDescription mb-3 m-2 font-normal text-black-700 dark:text-black-400"
            onChange={(e) => setbody(e.target.value)}
          />
        ) : (
          <div className="postDescription mb-3 m-2 font-normal text-black-700 dark:text-black-400">
            {body}
          </div>
        )}
        {updateMode && (
          <div className="updateButtonDiv flex">
            <button
              className="px-6 py-2 mx-2 block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600"
              onClick={() => {
                setupdateMode(false);
                navigate("/blogs");
              }}
            >
              Discard
            </button>
            <button
              className="px-6 py-2 mx-2 block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600"
              onClick={updatePost}
            >
              Update
            </button>
          </div>
        )}
        {/* <div className="postDescription mb-3 m-2 font-normal text-black-700 dark:text-black-400">
          {body}
        </div> */}
      </div>
    </div>
  );
};

export default SingleArticle;
