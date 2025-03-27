import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogList, setBlog] = useState([]);

  const fetchBolg = async () => {
    const response = await axios.get("/api/blog");
    setBlog(response.data.blogs);
  };

  useEffect(() => {
    fetchBolg();
  }, []);
  console.log(menu);
  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => {
            setMenu("All");
            console.log("Menu:", "All");
          }}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          All
        </button>
        <button
          onClick={() => {
            setMenu("Technology");
            console.log("Menu:", "Technology");
          }}
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => {
            setMenu("Startup");
            console.log("Menu:", "Startup");
          }}
          className={
            menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Startup
        </button>
        <button
          onClick={() => {
            setMenu("Lifestyle");
            console.log("Menu:", "Lifestyle");
          }}
          className={
            menu === "Lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Lifestyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mb-24">
        {blogList
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <BlogItem
                key={index}
                id={item._id}
                image={item.image}
                title={item.title}
                category={item.category}
                description={item.description}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
