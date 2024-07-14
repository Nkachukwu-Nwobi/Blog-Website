import React from "react";
import hero from "@/public/hero2.png";
import hero3 from "@/public/hero3.png";
import Image from "next/image";
import Link from "next/link";
import Authors from "@/components/Authors";
import JoinUs from "@/components/JoinUs";
import { authorsList } from "@/libs/authorsList";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

function page() {
  return (
    <>
      <main className="  mx-auto">
        {/* Introduction - Owner's profile*/}
        <section className=" bg-lavender relative ">
          <div className=" flex w-8/12 mx-auto py-28 justify-between items-center">
            <div className=" w-[25%]">
              <Image
                src={authorsList[0].image}
                alt="A picture of the blog's editor"
                height={200}
                width={200}
                className=" w-full object-center h-[18rem]"
              />
            </div>
            <div className=" w-[72%] flex flex-col gap-6">
              <h1>
                Hey there, I’m {authorsList[0].name} and welcome to my Blog
              </h1>
              <p className=" text-midgrey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
              <div className="flex gap-3 text-xl text-black">
                <Link
                  href="/about"
                  className=" no-underline  hover:text-white flex "
                >
                  <FaFacebook />
                </Link>
                <Link
                  href="/about"
                  className=" no-underline  hover:text-white flex "
                >
                  <FaTwitter />
                </Link>
                <Link
                  href={
                    "https://github.com/Nkachukwu-Nwobi?action=show&controller=profiles&tab=contributions&user_id=Nkachukwu-Nwobi"
                  }
                  className=" no-underline  hover:text-white flex "
                >
                  <FaGithub />
                </Link>
                <Link
                  href={"https://www.linkedin.com/in/nkachukwu-nwobi/"}
                  className=" no-underline  hover:text-white flex "
                >
                  <FaLinkedin />
                </Link>
              </div>
            </div>
            <div className=" absolute bottom-0 flex w-8/12">
              <div className=" bg-yellow w-4/5 h-4"></div>
              <div className=" bg-purple w-1/5 h-4"></div>
            </div>
          </div>
        </section>

        {/* About Us */}
        <section className="w-10/12 mx-auto mt-[17rem] relative ">
          <div
            className=" w-full h-[25rem] bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${hero.src})`,
            }}
          >
            {/* white overlay */}
            <div className=" w-10/12  absolute top-[-55%] left-[7%] flex justify-between items-center">
              <div className=" w-[50%] py-14 px-14 bg-light">
                <h5>ABOUT US</h5>
                <h1 className=" text-[2rem] font-bold">
                  We are a team of content writers who share their learnings
                </h1>
              </div>
              <div className=" w-[50%] px-8">
                <p className=" text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            {/* blog statistics */}
            <div className=" absolute bottom-0 left-[7%] w-7/12">
              <div className=" flex gap-10 justify-between items-center bg-yellow text-black w-9/12  py-5 px-8">
                <div className=" flex flex-col gap-2 justify-center items-center">
                  <h1>15+</h1>
                  <p>Blogs Published</p>
                </div>
                <div className=" flex flex-col gap-2 justify-center items-center">
                  <h1>18K</h1>
                  <p>Views</p>
                </div>
                <div className=" flex flex-col gap-2 justify-center items-center">
                  <h1>30K+</h1>
                  <p>Total active Users</p>
                </div>
              </div>

              <div className=" w-full flex">
                <div className=" bg-purple w-2/5 h-4"></div>
                <div className=" bg-yellow w-3/5 h-4"></div>
              </div>
            </div>
          </div>

          {/* Mission and Vision */}

          <div className=" bg-lavender flex justify-between items-center px-[7rem] pt-[6rem] pb-[4rem]">
            <div className=" w-[46%] flex flex-col gap-3">
              <h5>Our mision</h5>
              <h3>
                Creating valuable content for creatives all around the world
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
            </div>

            <div className=" w-[46%] flex flex-col gap-3">
              <h5>Our Vision</h5>
              <h3>A platform that empowers individuals to improve</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className=" w-8/12 mx-auto flex justify-between items-center mt-20">
          <div className=" w-[50%]">
            <Image
              src={hero3}
              height={300}
              width={300}
              alt="group picture"
              className=" w-full object-cover"
            ></Image>
          </div>
          <div className=" w-[50%] px-14 py-14 flex flex-col gap-3 ">
            <h3 className=" font-bold">Why we started this Blog</h3>
            <h4 className=" font-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
        </section>

        <Authors />

        <section className=" w-8/12 mx-auto">
          <JoinUs />
        </section>
      </main>
    </>
  );
}

export default page;
