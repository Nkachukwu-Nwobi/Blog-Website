"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import Image from "next/image";

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
  const [imageSource, setImageSource] = useState<string | undefined>(undefined);
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [visibleComments, setVisibleComments] = useState<number>(3);
  const [toggle, setToggle] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loadComments, setLoadComments] = useState<boolean>(false); 

  useEffect(() => {
    

    const fetchComments = async () => {
      setCommentList(
        post.comments.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      );
    };
    fetchComments();
  }, [post]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textareaRef.current &&
        !textareaRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [textareaRef]);

  const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = e.currentTarget.comment.value;

    const res = await fetch(`/api/posts/${post._id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment }),
    });

    if (res.ok) {
      const data = await res.json();
      const newComment: Comment = data.newComment;

      setCommentList((prevComments) => {
        const updatedComments = [...prevComments, newComment];
        return updatedComments.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      setComment("");
    } else {
      alert("Failed to add comment");
    }
  };

  const loadCommentsHandler = async (count: number) => {
    setLoadComments(true);
    
    setTimeout(() => {
      setVisibleComments(count);
      setLoadComments(false);
    }
    , 1000);

  }

  function timeSince(dateString: string) {
    const now = Math.floor(new Date().getTime() / 1000); // Get the current date and time
    const then = Math.floor(new Date(dateString).getTime() / 1000); // Convert the comment date string to a Date object

    const seconds = Math.floor(now - then);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Handle edge cases for very recent comments (less than a second)
    if (seconds < 5) {
      return "Just now";
    }

    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  }

  return (
    <>
      <div className="mb-5">
        <Link
          className="bg-blue-900 text-white p-2 border border-blue-900 font-bold rounded-lg hover:bg-white hover:text-blue-900 hover:border-blue-900"
          href={"/"}
        >
          Back to home
        </Link>
      </div>

      <article className="my-20 max-w-5xl mx-auto">
        <div className="mt-10">
          <h2 className="text-4xl mb-5 mt-5 text-blue-900">{post.title}</h2>
          <h5 className="mb-5 text-slate-600 text-lg">
            Published on{" "}
            {new Intl.DateTimeFormat("en-NG", {
              dateStyle: "long",
              timeStyle: "short",
              timeZone: "Africa/Lagos",
            }).format(new Date(post.date))}
          </h5>
        </div>
        {post.image ? (
          <div className="flex justify-start gap-5 border-b-2 border-t-2 border-blue-900 py-10">
            <div className=" w-1/2">
              <Image
                src={post.image}
                alt="Blogpost Image"
                width={550}
                height={500}
                priority={true}
              />
            </div>

            <div className="w-1/2">
              <p>{post.content}</p>
            </div>
          </div>
        ) : (
          <div className="w-full border-b-2 border-t-2 border-blue-900 py-10">
            <p>{post.content}</p>
          </div>
        )}

        <div className=" mt-10 w-6/12">
          <h5 className=" ">Comments</h5>
          {commentList.length > 0 ? (
            commentList
              .slice(0, visibleComments)
              .map((comment: Comment, index) => (
                <div key={index} className="mt-6 flex gap-6">
                  <div className="px-4 rounded-[50%] bg-blue-900 text-white h-12 text-lg flex items-center justify-center">
                    U
                  </div>
                  <div className=" w-[30%]">
                    <div className=" flex flex-col gap-1 bg-zinc-200 text-blue-900 rounded-lg px-4 py-2">
                      <h5 className=" text-left text-sm text-black font-medium">
                        User
                      </h5>
                      <p className="">{comment.content}</p>
                    </div>
                    <p className="text-right mt-1 text-xs text-slate-400">
                      {timeSince(comment.createdAt)}
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <div>
              <p>No comments yet</p>
            </div>
          )}

          {visibleComments < commentList.length ? (
            <div className="flex justify-start items-center">
              <button
                onClick={() => loadCommentsHandler(visibleComments + 5)}
                className={`mt-2 p-2  font-normal rounded-lg text-blue-900 hover:text-blue-400 text-sm ${loadComments ? " animate-pulse" : ""}`}
              >
                {loadComments ? "Loading..." : "See more"}
              </button>
            </div>
          ) : (
            <div className="flex justify-start items-center">
              <button
                onClick={() => loadCommentsHandler(visibleComments - 5)}
                className="mt-2 p-2  font-normal rounded-lg text-blue-900 hover:text-blue-400 text-sm "
              >
                Less
              </button>
            </div>
          )}

          <div>
            <form
              onSubmit={postComment}
              className=" flex flex-col mt-4 gap-2 relative"
            >
              {/* <label htmlFor="comment">Comment:</label> */}
              <textarea
                ref={textareaRef}
                onClick={() => setToggle(!toggle)}
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id="comment"
                cols={30}
                rows={toggle ? 6 : 4}
                className=" px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent border-transparent bg-zinc-200 text-blue-900 rounded-lg"
                placeholder="Enter your comment here"
              ></textarea>
              <div className=" flex justify-between px-4 py-2 items-center absolute bottom-0 w-full">
                <div>
                  <MdOutlineEmojiEmotions className=" text-2xl" />
                </div>
                <button
                  type="submit"
                  className="bg-blue-900 text-white p-2 border border-blue-900 font-bold rounded-lg hover:bg-white hover:text-blue-900 hover:border-blue-900"
                >
                  <IoMdSend className="text-xs" />
                </button>
              </div>
            </form>

            {/* <Link
              className="bg-blue-900 text-white p-2 border border-blue-900 font-bold rounded-lg hover:bg-white hover:text-blue-900 hover:border-blue-900"
              href={`/articles/${post._id}/comment`}
            >
              Add comment
            </Link> */}
          </div>
        </div>
      </article>
    </>
  );
}
