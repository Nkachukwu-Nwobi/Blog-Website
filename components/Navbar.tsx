import Link from "next/link";
import ProfilePic from "@/components/ProfilePic";
import { FaFacebook, FaGithub, FaLinkedin, FaEnvelope, FaSearch  } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className=" bg-blue-900 sticky top-0 drop-shadow-xl z-10 mb-2">
      <div className="flex justify-between items-center px-5 py-2 text-white ">

        <div className="flex flex-col sm:flex-row gap-3 text-xl ">
        <Link href="/about" className="text-white/80 no-underline  hover:text-white flex ">
                <div><FaFacebook /></div>
        </Link>
        <Link href="/about" className="text-white/80 no-underline  hover:text-white flex ">
                <div><FaGithub /></div>
        </Link>
        <Link href="/about" className="text-white/80 no-underline  hover:text-white flex ">
                <div><FaLinkedin /></div>
        </Link>
        <Link href="/about" className="text-white/80 no-underline  hover:text-white flex ">
                <div><FaEnvelope /></div>
        </Link>
        </div>

        <div className="flex justify-between gap-2 items-center">
          <div className="flex flex-col gap-1">
          <ProfilePic />
          <Link href="/">CodeWithKarchies</Link>
          </div>
         
         <Link href="/" className="text-white/80 no-underline  hover:text-white flex ">
          <FaSearch />
        </Link>

        </div>

        <div>
          <Link
            className="bg-white p-2 text-blue-900 font-bold hover:bg-blue-900 hover:text-white hover:border-black rounded-lg border border-blue-900"
            href="/addPost"
          >
            Add Post
          </Link>
        </div>
      </div>
    </nav>
  );
}
