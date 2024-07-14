"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/app/Loading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Posts {
  _id: string;
  title: string;
  image: string;
  content: string;
  date: string;
}

function ReadNext() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 3;

  useEffect(() => {
    async function fetchPosts(page: number) {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL as string;

      try {
        const res = await fetch(
          `${base_url}/api/posts?page=${page}&limit=${postsPerPage}`
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

  return (
    <>
      <section className=" flex justify-between items-start my-6">
        {loading && <div className=" w-full my-4 loader"></div>}
        {posts.map((post) => (
          <Link
            href={`/article/${post._id}`}
            key={post._id}
            className="flex flex-col gap-1 w-[30%] hover:bg-lightyellow p-6 rounded-lg shadow-md cursor-pointer"
          >
            <div className="relative w-full bg-gray-200">
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={300}
                objectFit="cover"
                className="w-full h-[15rem]"
              />
            </div>
            <p>
              By <span className=" text-purple">Nkachukwu Nwobi</span> | &nbsp;
              {new Intl.DateTimeFormat("en-NG", {
                dateStyle: "long",
                // timeStyle: "short",
                // timeZone: "Africa/Lagos",
              }).format(new Date(posts[0].date))}
            </p>
            <h3>{post.title}</h3>
            <p>{post.content.slice(0, 100)}...</p>
          </Link>
        ))}
      </section>
    </>
  );
}

export default ReadNext;
