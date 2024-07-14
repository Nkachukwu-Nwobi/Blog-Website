"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import Image from "next/image";
import profilepic from "@/public/profile-pic.jpeg";
import ReadNext from "./ReadNext";
import JoinUs from "./JoinUs";
import CommentsList from "./CommentsList";

interface Post {
  _id: string;
  image?: string; // Make image optional
  title: string;
  content: string;
  date: string;
  comments: { content: string; createdAt: string }[];
}

interface Comment {
  content: string;
  createdAt: string;
}

export default function Article({ post }: { post: Post }) {
  // const [imageSource, setImageSource] = useState<string | undefined>(undefined);
  // const [comment, setComment] = useState<string>("");

  // const [visibleComments, setVisibleComments] = useState<number>(3);
  // const [toggle, setToggle] = useState<boolean>(false);
  // const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const [loadComments, setLoadComments] = useState<boolean>(false);

  return (
    <>
      <article className="my-20 w-10/12 mx-auto">
        <section className="mt-10 w-4/12 text-left">
          {/* Author's Bio */}
          <div className=" flex w-9/12 justify-between items-center">
            <Image
              className=" rounded-[50%] w-auto h-auto"
              src={profilepic}
              width={60}
              height={60}
              alt="Author's image"
            ></Image>
            <div className=" flex flex-col justify-between">
              <p className=" text-purple">Nkachukwu Nwobi</p>
              <h5 className=" text-midgrey text-lg">
                Published on{" "}
                {new Intl.DateTimeFormat("en-NG", {
                  dateStyle: "long",
                  // timeStyle: "short",
                  // timeZone: "Africa/Lagos",
                }).format(new Date(post.date))}
              </h5>
            </div>
          </div>

          <div className=" flex flex-col my-5">
            <h2 className=" text-black">{post.title}</h2>
            <h4 className="text-midgrey">Technology</h4>
          </div>
        </section>

        {/* Blogpost article */}

        <section className="flex flex-col gap-8 border-b-2 border-t-2 border-darkgrey py-10">
          {post.image && (
            <div className=" w-full mx-auto">
              <Image
                className=" w-8/12 mx-auto h-[30rem] object-center"
                src={post.image}
                alt="Blogpost Image"
                width={400}
                height={400}
                priority={true}
              />
            </div>
          )}

          <div className="w-9/12 mx-auto">
            <p>{post.content}</p>
          </div>
        </section>

        <section className=" mt-10 w-6/12 flex flex-col gap-6 ">
          <h3 className=" ">Comments</h3>
          <CommentsList post={post} />
        </section>

        <section className=" mt-14 border-b-2 border-midgrey py-8">
          <div>
            <h3>What to read next</h3>
          </div>
          <div>
            <ReadNext />
          </div>
        </section>

        <JoinUs />
      </article>
    </>
  );
}
