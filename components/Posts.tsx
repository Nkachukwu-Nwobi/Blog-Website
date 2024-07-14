"use client";

import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Posts {
  _id: string;
  title: string;
  image: string;
  content: string;
  date: string;
}

export default function Posts({ posts }: { posts: Posts[] }) {
  const [imageSources, setImageSources] = useState<{ [key: string]: string }>(
    {}
  );
  useEffect(() => {}, [posts]);

  return (
    <>
      <div className="grid gap-10 my-20 w-11/12 mx-auto grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-auto">
        {posts.map((post: Posts) => (
          <div
            key={post._id}
            className="px-6 py-4 border border-black bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex flex-col gap-5 relative"
          >
            <div className="mb-8">
              <h2 className="font-bold text-2xl ">
                <Link
                  className=" text-bold text-black hover:text-gray-400"
                  href={`/articles/${post._id}`}
                >
                  {post.title}
                </Link>
              </h2>

              <h5 className="mb-5 text-slate-600">
                {new Intl.DateTimeFormat("en-NG", {
                  dateStyle: "long",
                  timeStyle: "short",
                  timeZone: "Africa/Lagos",
                }).format(new Date(post.date))}
              </h5>

              <div className="flex flex-col gap-5 ">
                <div className=" w-9/12 mx-auto bg-orange-300">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={300}
                      height={300}
                      objectFit="cover"
                      className="w-full h-[15rem]"
                    />
                  )}
                </div>

                <div>
                  <p>
                    {post.content.slice(0, 200)}...
                    <Link
                      className=" text-bold text-blue-900 hover:text-blue-900/50 text-left"
                      href={`/articles/${post._id}`}
                    >
                      Read More
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pb-0 mt-6 absolute bottom-0 ">
              <div>
                <EditBtn id={post._id} />
              </div>
              <div>
                <DeleteBtn id={post._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
