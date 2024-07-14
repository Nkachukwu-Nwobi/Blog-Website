"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PrimaryBtn from "./PrimaryBtn";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  const pathname = usePathname();

  return (
    <nav className=" bg-black drop-shadow-xl w-full flex flex-col gap-10 py-10 mt-20">
      <div className=" w-10/12 mx-auto flex justify-between items-center text-white gap-20 ">
        <div>
          <div className="flex flex-col gap-1 text-center justify-center">
            <Link href="/">CodeWithKarchies</Link>
          </div>
        </div>

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
            href={"/contactUs"}
            className={`${
              pathname === "/contactUs" ? "text-yellow" : ""
            } hover:text-yellow/70`}
          >
            Contact us
          </Link>

          <Link
            href={"/contact"}
            className={`${
              pathname === "/contact" ? "text-yellow" : ""
            } hover:text-yellow/70`}
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="flex gap-20 px-16 py-14 w-10/12 mx-auto bg-darkgrey bg-opacity-[20%]">
        <h3 className=" w-[50%] text-light">
          Subscribe to our news letter to get latest updates and news
        </h3>

        <div className="w-[50%] flex justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Enter your Email"
            className=" px-4 py-2 text-light bg-darkgrey bg-opacity-[20%] border border-midgrey w-[65%]"
          />
          <PrimaryBtn text="Subscribe" link={`/subscribe`} />
        </div>
      </div>

      <div className=" w-10/12 mx-auto flex justify-between items-center">
        <div className=" flex flex-col gap-2 text-light">
          <p>Finstreet 118 2561 Fintown</p>
          <p>davidnwobi@gmail.com &nbsp; 07086689948</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 text-xl text-midgrey">
          <Link
            href="/about"
            className="text-white no-underline  hover:text-white flex "
          >
            <FaFacebook />
          </Link>
          <Link
            href="/about"
            className="text-white no-underline  hover:text-white flex "
          >
            <FaTwitter />
          </Link>
          <Link
            href={
              "https://github.com/Nkachukwu-Nwobi?action=show&controller=profiles&tab=contributions&user_id=Nkachukwu-Nwobi"
            }
            className="text-white no-underline  hover:text-white flex "
          >
            <FaGithub />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/nkachukwu-nwobi/"}
            className="text-white no-underline  hover:text-white flex "
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Footer;
