import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function Header() {
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/* Logo */}

        <div className="">
          <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
              layout="fill"
              className="object-contain"
              alt="Instagram logo"
            />
          </div>
          <div className="cursor-pointer h-24 w-10 relative lg:hidden">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
              layout="fill"
              className="object-contain"
              alt="Instagram logo"
            />
          </div>
        </div>

        {/* Search */}

        <div className="relative">
          <div className="absolute top-3 left-3">
            <CiSearch />
          </div>
          <input
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
            type="text"
            placeholder="search"
          />
        </div>

        {/* Nav-items */}
        <div className="">
          <div className="flex space-x-4 items-center">
            <AiFillHome className="hidden md:inline-flex text-xl cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
            <AiOutlinePlusCircle className="text-xl cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />
            <Image
              src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
              width={40}
              height={10}
              className="rounded-full cursor-pointer"
              alt="User image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
