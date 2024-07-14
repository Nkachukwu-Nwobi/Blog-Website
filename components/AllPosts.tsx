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

export default function AllPosts({ posts }: { posts: Posts[] }) {
  return (
    <main className=" w-10/12 mx-auto bg-light">
      <div className=" border-b pb-2">
        <h2>All posts</h2>
      </div>
      <div className=" flex flex-col gap-10 mt-8 w-11/12">
        {posts.length > 0 &&
          posts.map((post) => (
            <Link
              href={`/article/${post._id}`}
              key={post._id}
              className="flex items-center gap-8 hover:bg-lightyellow"
            >
              <div className="w-[40%]">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={300}
                  height={300}
                  objectFit="cover"
                  className="w-full h-[16rem]"
                />
              </div>

              <div className=" w-[60%] flex flex-col gap-4">
                <h5 className="text-purple">Technology</h5>
                <h3 className=" ">{post.title}</h3>
                <p>{post.content.slice(0, 200)}</p>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}
