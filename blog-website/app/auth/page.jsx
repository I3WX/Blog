"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const response = await axios.post(endpoint, formData);
      if (response.data.message) {
        toast.success(response.data.message);
        if (isLogin) {
          localStorage.setItem("user", formData.username); // Store user in localStorage
          router.push("/"); // Redirect to home page
        }
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 border border-solid border-black shadow-[-7px_7px_0px_#000000] rounded-none min-w-[320px]"
      >
        <h1 className="text-2xl font-bold mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={onChangeHandler}
          className="w-full mb-4 px-4 py-2 border border-solid border-gray-300 rounded-none focus:outline-none focus:border-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChangeHandler}
          className="w-full mb-6 px-4 py-2 border border-solid border-gray-300 rounded-none focus:outline-none focus:border-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-white text-black py-3 px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[2px] hover:shadow-[-5px_5px_0px_#000000] transition-all font-medium"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p
          className="mt-6 text-center cursor-pointer hover:underline font-medium"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;