import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const Header = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          alt=""
          width={180}
          className="w-[130px] sm:w-auto"
        />
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/auth")}
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]"
          >
            Get started <Image src={assets.arrow} alt="" />
          </button>
        )}
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blog</h1>
        <p className="mt-10 max-w-[740] m-auto text-xs sm:text-base">
        Stay updated with the latest trends, insights, and stories from the world of technology, startups, and lifestyle. Discover fresh ideas and expert advice to inspire your journey!
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500] scale-75 sm:scale-100 mx-auto mt-10 border boreder-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
