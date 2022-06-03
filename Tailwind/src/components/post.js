import { Link, useLocation } from "react-router-dom";
import { Context } from "../context/Context";
import { useContext, useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
const Post = ({ data }) => {
  const location = useLocation();

  const { user } = useContext(Context);
  const path = location.pathname.split("/")[2];

  const ImageLink = "";
  // const ImageLink = "/images/";
  // const deletePost = async () => {
  //   await axios
  //     .delete(`http://localhost:5000/api/articles/delete/${path}`, {
  //     // .delete(`http://localhost:5000/api/articles/delete`, {
  //     // .delete(`api/articles/delete`, {
  //       data: { username: user.username },
  //     })
  //     .then(() => window.location.replace("/"))
  //     .catch(() => console.log("error in deletePost"));
  // };
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-12 lg:px-20 lg:w-1/2 lg:h-1/2 container  mx-auto px-4 md:px-12">
      <div className="Posts overflow-hidden rounded-lg shadow-lg">
        {/* <div className="float-right mb-10">welcome {user.username}</div> */}
        <div>
          <h5
            style={{ padding: "5px" }}
            className="font-bold text-lg  font-sans  "
          >
            Creater: {data.username}
          </h5>
          {user?.username === data.username && (
            <div className="  float-right">
              {/* <i
                    className="editIcon far fa-edit"
                    onClick={() => setupdateMode(true)}
                  /> */}
              {/* <DeleteIcon onClick={deletePost} className="" /> */}
              {/* <i className="editIcon far fa-trash-alt" onClick={deletePost} /> */}
            </div>
          )}
        </div>
        {data.image && (
          <img
            className="postImage block h-auto w-full"
            // src={ImageLink + data.image + ".jpg"}
            src={ImageLink + data.image}
            alt="postImage"
          />
        )}
        <div className="postInfo">
          <div className="categories">
            {/* {data.categories.map((cate, key) => (
            <span className="category" key={key}>
              {cate.name}
            </span>
          ))} */}
          </div>
          <Link className="link" to={`/post/${data._id}`}>
            <span className="title no-underline hover:underline text-black text-lg font-bold">
              {" "}
              {data.title}{" "}
            </span>
          </Link>

          <hr />
          <span className="postDate flex items-center justify-between leading-tight  md:p-4 float-right">
            {new Date(data.createdAt).toDateString()}
          </span>
        </div>
        <p className="body flex items-center justify-between leading-tight  md:p-4">
          {data.body}
        </p>
      </div>
    </div>
  );
};

export default Post;
