"use client";
import React, { useState, useEffect } from "react"; 
import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axios.get("/api/blog");
    setBlogs(res.data.blogs);
  };
  const deleteBlog = async (mongoId) => {
    try {
      console.log("Deleting blog with ID:", mongoId);
      const response = await axios.delete(`/api/blog`, {
        params: {
          id: mongoId,
        },
      });
      console.log("Request URL:", response.config.url);
      toast.success(response.data.msg);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete the blog. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blog</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                author name
              </th>
              <th scope="col" className=" px-6 py-3">
                blog title
              </th>
              <th scope="col" className=" px-6 py-3">
                blog
              </th>
              <th scope="col" className=" px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
              return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.Date} deleteBlog={deleteBlog} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
