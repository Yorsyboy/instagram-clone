import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { userState } from "atom/userAtom";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(
            db,
            "users",
            user.auth.currentUser.providerData[0].uid
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
          }
        };
        fetchUser();
      } else {
        console.log("user is signed out");
      }
    });
  }, []);

  const OnSignOut = () => {
    signOut(auth);
    setCurrentUser(null);
  };

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
            {currentUser ? (
              <>
                <AiOutlinePlusCircle
                  onClick={() => setOpen(true)}
                  className="text-xl cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
                />
                <Image
                  onClick={OnSignOut}
                  src={currentUser?.userImg}
                  width={40}
                  height={10}
                  className="rounded-full cursor-pointer"
                  alt="User image"
                />
              </>
            ) : (
              <button
                onClick={() => router.push("/auth/signin")}
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
