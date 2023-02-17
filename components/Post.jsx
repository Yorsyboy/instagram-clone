import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";

export default function Post({ id, username, userImg, img, caption }) {
  return (
    <div
      className="bg-white my-7 border-1 rounded-md
    "
    >
      {/* Post header */}
      <div className="flex items-center p-5">
        <img
          className="h-12 rounded-full object-cover border-1 p-1 mr-3"
          src={userImg}
          alt="User image"
        />
        <p className="font-bold flex-1">{username}</p>
        <BsThreeDots />
      </div>

      {/* Post image */}
      <img className="w-full object-cover" src={img} alt="Post Image" />

      {/* Post buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <AiOutlineHeart className="btn" />
          <FaRegComment className="btn" />
        </div>
        <BsBookmark className="btn" />
      </div>

      {/* Post caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      {/* Post comments Input */}
      <form className="flex items-center p-4">
        <HiOutlineEmojiHappy className="" />
        <input
          className="border-none flex-1 focus:ring-0"
          type="text"
          placeholder="Enter your comment"
        />
        <button className="text-blue-400 font-bold ">Post</button>
      </form>
    </div>
  );
}
