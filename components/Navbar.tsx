"use client"

import Link from "next/link";
import "../app/globals.css";
import ProfilePic from "@/components/ProfilePic";
import SearchBar from "@/components/SearchBar";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname()
  console.log(pathname)


  return (
    <nav className=" bg-black sticky top-0 drop-shadow-xl z-10">
      <div className=" max-w-7xl mx-auto flex justify-between items-center px-10 py-2 text-white gap-20 ">
        {/*                               */}

        <div>
          <div className="flex flex-col gap-1 text-center justify-center">
            <ProfilePic />
            <Link href="/">CodeWithKarchies</Link>
          </div>
        </div>

        {/*                               */}

        <div className=" flex justify-between gap-4 text-center"> 
          <Link href="/" className={pathname === '/' ? 'text-red-500' : ''}>
            Home
          </Link>
          <Link href={"/blog"} className={pathname === '/blog' ? 'text-red-500' : ''}>Blog</Link>
          <Link href={"/contact"} className={pathname === '/contact' ? 'text-red-500' : ''}>Contact</Link>
        </div>

        {/*                               */}

        {/* getSearchResults={(results) => setPosts(results)} */}

        {/*                               */}

        <div className="flex flex-col sm:flex-row items-center gap-6">

          <div>
          <SearchBar />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 text-xl">
            <Link
              href="/about"
              className="text-white/80 no-underline  hover:text-white flex "
            >
              <div>
                <FaFacebook />
              </div>
            </Link>
            <Link
              href="/about"
              className="text-white/80 no-underline  hover:text-white flex "
            >
              <div>
                <FaGithub />
              </div>
            </Link>
            <Link
              href="/about"
              className="text-white/80 no-underline  hover:text-white flex "
            >
              <div>
                <FaLinkedin />
              </div>
            </Link>
            <Link
              href="/about"
              className="text-white/80 no-underline  hover:text-white flex "
            >
              <div>
                <FaEnvelope />
              </div>
            </Link>
          </div>

          
        </div>
      </div>
    </nav>
  );
}
