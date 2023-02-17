import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/* Logo */}

        <div className="">
          <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
            <Image
              onClick={() => router.push("/")}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
              layout="fill"
              className="object-contain"
              alt="Instagram logo"
            />
          </div>
          <div className="cursor-pointer h-24 w-10 relative lg:hidden">
            <Image
              onClick={() => router.push("/")}
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
            <AiFillHome
              onClick={() => router.push("/")}
              className="hidden md:inline-flex text-xl cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
            />
            {session ? (
              <>
                <AiOutlinePlusCircle
                  onClick={() => setOpen(true)}
                  className="text-xl cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
                />
                <Image
                  onClick={signOut}
                  src={session.user.image}
                  width={40}
                  height={10}
                  className="rounded-full cursor-pointer"
                  alt="User image"
                />
              </>
            ) : (
              <button
                onClick={signIn}
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
