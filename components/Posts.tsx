"use client";

import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Posts {
  _id: string;
  title: string;
  image: { data: Buffer; contentType: string };
  content: string;
  date: string;
}

export default function Posts({ posts }: { posts: Posts[] }) {
  const [imageSources, setImageSources] = useState<{ [key: string]: string }>(
    {}
  );
  useEffect(() => {
    const loadImageSources = async () => {
      const sources: { [key: string]: string } = {};
      await Promise.all(
        posts.map(async (post) => {
          if (post.image) {
            const base64Image = `data:${
              post.image.contentType
            };base64,${Buffer.from(post.image.data).toString("base64")}`;
            sources[post._id] = base64Image;
          }
        })
      );
      setImageSources(sources);
    };
     loadImageSources();
  }, [posts]);

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-10 my-20 w-10/12 mx-auto">
        {posts.map((post: Posts) => (
          <div
            key={post._id}
            className="px-6 py-4 border border-black bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex flex-col gap-5"
          >
            <div>
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

              

              {post.image ? (
                <div className="flex flex-col gap-5 ">
                  <div className=" w-full">
                  {post.image && imageSources[post._id] ? (
                      <Image
                        src={imageSources[post._id]}
                        alt="Blogpost image"
                        width={10}
                        height={10}
                        priority={true}
                        className=" mx-auto w-11/12 h-1/2"
                      />
                    ) : null}
                  </div>

                  <div className="">
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
              ) : (
                <div>
                <p>
                  {post.content.slice(0, 1000)}...
                  <Link
                    className=" text-bold text-blue-900 hover:text-blue-900/50"
                    href={`/articles/${post._id}`}
                  >
                    Read More
                  </Link>
                </p>
              </div>
              )}


            </div>


            <div className="flex gap-3 pb-0 mb-0">
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
