"use client";

import { useEffect, useState, useRef } from "react";
import AllPosts from "@/components/AllPosts";
import Loading from "../Loading";
import Link from "next/link";
import PrimaryBtn from "@/components/PrimaryBtn";
import JoinUs from "@/components/JoinUs";
import Image from "next/image";

interface Posts {
  _id: string;
  title: string;
  image: string;
  content: string;
  date: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 5;
  const allPostsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPosts(page: number) {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL as string;
      setLoading(true);

      try {
        const res = await fetch(
          `${base_url}/api/posts?page=${page}&limit=${postsPerPage}`,
          { cache: "force-cache", next: { revalidate: 3600 } }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data.postsWithComments);
        setTotalPosts(data.totalPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (allPostsRef.current) {
      allPostsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage * postsPerPage >= totalPosts;

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const randomIndex = Math.floor(Math.random() * posts.length);
  const featuredPost = posts[randomIndex];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className=" mx-auto">
          {/* Featured post */}

          <section className=" bg-lavender mt-0 py-16">
            <div className=" w-10/12 mx-auto flex justify-between items-center">
              {posts.length > 0 && (
                <>
                  <div className="w-[50%]">
                    <p>Featured Post</p>
                    <div className=" flex flex-col gap-2 text-black">
                      <h2 className=" text-black">{featuredPost.title}</h2>
                      <p>
                        By <span className=" text-purple">Nkachukwu Nwobi</span>{" "}
                        |{" "}
                        {new Intl.DateTimeFormat("en-NG", {
                          dateStyle: "long",
                          // timeStyle: "short",
                          // timeZone: "Africa/Lagos",
                        }).format(new Date(featuredPost.date))}
                      </p>
                      <p>{featuredPost.content.slice(0, 300)}</p>
                      <div className=" w-4/12">
                        <PrimaryBtn
                          text="Read more >"
                          link={`/article/${featuredPost._id}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" w-[40%]">
                    <Image
                      src={featuredPost.image}
                      alt="Blogpost image"
                      width={300}
                      height={300}
                      objectFit="cover"
                      className="w-full h-[22rem]"
                    />
                  </div>
                </>
              )}
            </div>
          </section>
          <div ref={allPostsRef}></div>

          {/* All posts */}
          <div className=" mt-10">
            <AllPosts posts={posts} />
          </div>

          <section className=" mt-20">
            <div className=" mx-auto flex gap-2 justify-center py-4">
              <button
                onClick={handlePrevPage}
                disabled={prevDisabled}
                className={`${
                  prevDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-yellow"
                } text-white px-4 py-2 rounded`}
              >
                {"<"} &nbsp; Prev
              </button>

              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`${
                    currentPage === page
                      ? "bg-darkgrey text-white"
                      : "bg-white text-darkgrey hover:bg-darkgrey hover:text-white"
                  } px-4 py-2 rounded`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={nextDisabled}
                className={`${
                  nextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-yellow"
                } text-white px-4 py-2 rounded`}
              >
                Next &nbsp; {">"}
              </button>
            </div>
          </section>

          <JoinUs />
        </main>
      )}
    </>
  );
}
