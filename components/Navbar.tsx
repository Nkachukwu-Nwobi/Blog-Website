"use client";

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
  const pathname = usePathname();

  return (
    <nav className=" bg-black sticky top-0 drop-shadow-xl z-50">
      <div className=" max-w-7xl mx-auto flex justify-between items-center px-10 py-6 text-white gap-20 ">
        {/*                               */}

        <div>
          <div className="flex flex-col gap-1 text-center justify-center">
            <Link href="/">CodeWithKarchies</Link>
          </div>
        </div>

        {/* getSearchResults={(results) => setPosts(results)} */}

        {/*                               */}

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-yellow" : ""
            } hover:text-yellow/70`}
          >
            Home
          </Link>

          <Link
            href={"/blog"}
            className={`${
              pathname === "/blog" ? "text-yellow" : ""
            } hover:text-yellow/70`}
          >
            Blog
          </Link>

          <Link
            href={"/about"}
            className={`${
              pathname === "/about" ? "text-yellow" : ""
            } hover:text-yellow/70`}
          >
            About us
          </Link>

          <Link
            href={"/contact"}
            className={`${
              pathname === "/contact" ? "text-yellow" : ""
            } hover:text-yellow/70`}
          >
            Contact us
          </Link>

          <button className=" bg-white px-8 py-2 text-black">Subscribe</button>

          {/* <div>
            <SearchBar />
          </div> */}

          {/* <div className="flex flex-col sm:flex-row gap-3 text-xl">
            <Link
              href="/about"
              className="text-white no-underline  hover:text-white flex "
            >
              <div>
                <FaFacebook />
              </div>
            </Link>
            <Link
              href="/about"
              className="text-white no-underline  hover:text-white flex "
            >
              <div>
                <FaGithub />
              </div>
            </Link>
            <Link
              href="/about"
              className="text-white no-underline  hover:text-white flex "
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
          </div> */}
        </div>
      </div>
    </nav>
  );
}
