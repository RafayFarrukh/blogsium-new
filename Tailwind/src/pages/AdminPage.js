import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { Context } from "../context/Context";

const AdminPage = () => {
  const { user } = useContext(Context);

  return (
    <>
      <Navbar />
      <div className="m-9 ">
        <div className="text-4xl font-semibold">Admin Panels</div>

        <li>
          <Link
            to="/admin/userlist"
            className=" py-2 pr-4 pl-3 text-gray-700 border-b border-yellow-100 hover:bg-red-900 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            All Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/articlelist"
            className=" py-2 pr-4 pl-3 text-gray-700 border-b border-yellow-100 hover:bg-yellow-500 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            All Articles
          </Link>
        </li>
      </div>
    </>
  );
};

export default AdminPage;
