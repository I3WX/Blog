import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <div className="flex flex-col bg-slate-100">
      <div className="px-2 sm:pl-14 py-3 border border-black">
        <Image src={assets.logo} width={120} alt="" />
      </div>
      <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-black">
        <div className="w-[50%] sm:w-[80%] absolute right-0">
          <Link href='/admin/addProduct' className="flex item-center border border-black gap-3 font-medium px-3 py-3 bg-white shadow-[-5px_5px_0px_#000000]">
            <Image src={assets.add_icon} width={28} alt="" />
            <p>Add Blog</p>
          </Link>
          <Link href='/admin/blogList' className=" mt-5 flex item-center border border-black gap-3 font-medium px-3 py-3 bg-white shadow-[-5px_5px_0px_#000000]">
            <Image src={assets.blog_icon} width={28} alt="" />
            <p>Blog list</p>
          </Link>
          <Link href='/admin/subscription' className=" mt-5 flex item-center border border-black gap-3 font-medium px-3 py-3 bg-white shadow-[-5px_5px_0px_#000000]">
            <Image src={assets.email_icon} width={28} alt="" />
            <p>Subscription</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
