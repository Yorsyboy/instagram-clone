import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Story({ username, img, isUser }) {
  return (
    <div className="relative group cursor-pointer">
      <img
        className="h-14 rounded-full p-[1.5px] border-red-500 border-2 group-hover:scale-110 transition-transform duration-200 ease-out"
        src={img}
        alt="User image"
      />
      {isUser && <AiOutlinePlus className="absolute top-5 left-5 text-white text-sm" />}
      <p className="text-xs w-14 truncate">{username}</p>
    </div>
  );
}
