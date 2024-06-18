"use client";
import React from "react";
import backgroundImage from "@/public/hero.png";
import logoWrapper from "@/public/logoWrapper.png";
import hero2 from "@/public/hero2.png";
import { useEffect, useState } from "react";
import PrimaryBtn from "@/components/PrimaryBtn";
import Link from "next/link";
import Image from "next/image";
import { authorsList } from "@/libs/authorsList";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

interface Posts {
  _id: string;
  title: string;
  image: string;
  content: string;
  date: string;
}

function Page() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL as string;

      try {
        const res = await fetch(`${base_url}/api/posts`);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();

        setPosts(data.postsWithComments);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <main>
      <section
        className="bg-cover bg-center bg-local bg-no-repeat h-[100vh] w-full relative flex"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="w-10/12 mx-auto text-white font-black flex flex-col gap-20 py-14 z-10 text-left mt-20">
          <div>
            <h3>Latest post</h3>
          </div>

          {loading ? (
            <section>Loading...</section>
          ) : (
            <section className="flex flex-col gap-6">
              <div className="w-full text-6xl">
                <h1>{posts[0].title}</h1>
              </div>
              <div className="text-xl text-left text-white ">
                <p>
                  By <span className=" text-yellow">Nkachukwu Nwobi</span> |{" "}
                  {new Intl.DateTimeFormat("en-NG", {
                    dateStyle: "long",
                    // timeStyle: "short",
                    // timeZone: "Africa/Lagos",
                  }).format(new Date(posts[0].date))}
                </p>
              </div>

              <div className=" w-8/12">
                <p>{posts[0].content.slice(0, 500)}</p>
              </div>

              <div className=" w-3/12">
                <PrimaryBtn text="Read more >" />
              </div>
            </section>
          )}
        </div>
      </section>

      <section className=" flex justify-between gap-8 w-10/12 mx-auto mt-10">
        <section className=" flex flex-col gap-8 w-[55%]">
          {posts.length > 0 ? (
            <>
              <h2 className=" text-black">Featured Post</h2>
              <div className=" flex flex-col gap-6 text-black">
                <img
                  className=" h-[15rem] w-[20rem]"
                  src={posts[1].image}
                  alt="Blogpost image"
                />
                <p>
                  By <span className=" text-purple">Nkachukwu Nwobi</span> |{" "}
                  {new Intl.DateTimeFormat("en-NG", {
                    dateStyle: "long",
                    // timeStyle: "short",
                    // timeZone: "Africa/Lagos",
                  }).format(new Date(posts[1].date))}
                </p>
                <h5>{posts[1].title}</h5>
                <p>{posts[1].content.slice(0, 200)}</p>
                <div className=" w-4/12">
                  <PrimaryBtn text="Read more >" />
                </div>
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </section>

        <section className=" w-[45%]">
          {loading ? (
            <section>Loading...</section>
          ) : (
            <div>
              <div className=" flex justify-between items-center mb-8">
                <h2 className=" text-black">All Posts</h2>
                <Link href={`/blog`} className=" text-purple">
                  View all
                </Link>
              </div>

              <div className=" flex flex-col gap-2">
                {posts.slice(0, 4).map((post) => (
                  <Link
                    href={`/articles/${post._id}`}
                    key={post._id}
                    className=" flex flex-col text-black hover:bg-lightyellow px-6 py-4 rounded-md"
                  >
                    <p className=" text-sm">
                      By <span className=" text-purple">Nkachukwu Nwobi</span> |{" "}
                      {new Intl.DateTimeFormat("en-NG", {
                        dateStyle: "long",
                        // timeStyle: "short",
                        // timeZone: "Africa/Lagos",
                      }).format(new Date(post.date))}
                    </p>
                    <h3>{post.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </section>

      <section className=" mt-40 w-10/12 mx-auto ">
        <div className=" flex justify-end ">
          <div className=" bg-yellow w-[50%] h-6"></div>
          <div className=" bg-purple w-[25%] h-6"></div>
        </div>

        <div className=" flex justify-center gap-20 px-16 py-20 bg-lavender">
          <div className=" flex flex-col gap-2 w-1/2">
            <h3>About us</h3>
            <h2>
              We are a community of content writers who share their learnings
            </h2>
            <p className=" text-midgrey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className=" text-purple">Read More {">"}</p>
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <h3>Our Mission</h3>
            <h2>
              Creating valuable content for creatives all around the world
            </h2>
            <p className=" text-midgrey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </section>

      <section className=" mt-20 w-10/12 mx-auto relative">
        <Image src={hero2} alt="banner mage"></Image>
        <div className=" w-[50%] flex flex-col gap-4 absolute right-0 bottom-0 bg-light px-16 py-24 text-darkgrey">
          <h3>WHY WE STARTED</h3>
          <h2 className=" text-black">
            It started out as a simple idea and evolved into our passion
          </h2>
          <p className=" text-midgrey text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </p>
          <div className=" w-[50%]">
            <PrimaryBtn text="Discover our story >" />
          </div>
        </div>
      </section>

      <section className=" mt-20 w-10/12 mx-auto flex flex-col gap-10">
        <div className=" text-center">
          <h2>List of Authors</h2>
        </div>
        <div className=" flex gap-14 mx-auto w-10/12">
          {authorsList.map((author) => (
            <div
              key={author.id}
              className=" flex flex-col gap-2 mx-auto justify-center items-center bg-lightgrey hover:bg-lightyellow px-8 py-10 w-[35%] text-center"
            >
              <div className=" mb-4 h-[100px]">
                <Image
                  src={author.image}
                  alt="author image"
                  width={100}
                  height={100}
                  className=" rounded-[50%] h-[100px]"
                />
              </div>

              <h3 className=" text-darkgrey text-2xl">{author.name}</h3>
              <p className=" text-sm text-midgrey">{author.role} at CWK</p>
              <div className=" flex gap-4">
                <a key={author.socials[0].name} href={author.socials[0].link}>
                  <FaFacebook />
                </a>
                <a key={author.socials[1].name} href={author.socials[1].link}>
                  <FaTwitter />
                </a>
                <a key={author.socials[2].name} href={author.socials[2].link}>
                  <FaLinkedin />
                </a>
                <a key={author.socials[3].name} href={author.socials[3].link}>
                  <FaGithub />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className=" mt-20 w-10/12 mx-auto flex justify-between items-center gap-10">
        <div className=" flex flex-col w-[25%] text-midgrey">
          <p>We are</p>
          <h5>Featured in</h5>
        </div>
        <div className=" w-[75%]">
          <Image
            src={logoWrapper}
            alt="images of publications we have been featured in"
          ></Image>
        </div>
      </section>
    </main>
  );
}

export default Page;
