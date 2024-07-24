"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { IoMdSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { Theme } from "emoji-picker-react";

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
interface EmojiClickData {
  emoji: string; // the emoji character, for example: '😀'. Emoji ID in custom emojis
}

function CommentsList({ post }: { post: Post }) {
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [visibleComments, setVisibleComments] = useState<number>(3);
  const [loadComments, setLoadComments] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [openEmojiSelector, setOpenEmojiSelector] = useState<boolean>(false);
  const toggleref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
    setLoading(false);
  }, [post]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      toggleref.current &&
      !toggleref.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setOpenEmojiSelector(false);
    }
  }, []);

  useEffect(() => {
    if (openEmojiSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openEmojiSelector, handleClickOutside]);

  const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setSubmitting(true);
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
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setTimeout(() => {
        setSubmitting(false);
      }, 1000);
    }
  };

  const loadCommentsHandler = async (count: number) => {
    setLoadComments(true);

    setTimeout(() => {
      setVisibleComments(count);
      setLoadComments(false);
    }, 1000);
  };

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

  function handleEmojiClick(emojiData: EmojiClickData) {
    setComment((prevComment) => prevComment + emojiData.emoji);
  }

  return (
    <>
      {loading ? (
        <div className="loader ml-4"></div>
      ) : (
        <section>
          {commentList.length > 0 ? (
            commentList.slice(0, visibleComments).map((comment: Comment) => (
              <div key={comment.createdAt} className="mt-6 flex gap-6">
                <div className="px-4 rounded-[50%] bg-purple text-white h-12 text-lg flex items-center justify-center">
                  U
                </div>
                <div className=" w-[30%]">
                  <div className=" flex flex-col gap-1 bg-lavender text-blue-900 rounded-lg px-4 py-2">
                    <h5 className=" text-left text-sm text-purple font-medium">
                      User
                    </h5>
                    <p className=" text-darkgrey">{comment.content}</p>
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

          {visibleComments < commentList.length && (
            <div className="flex justify-start items-center">
              <button
                onClick={() => loadCommentsHandler(visibleComments + 3)}
                className={`mt-2 p-2  font-normal rounded-lg text-blue-900 hover:text-blue-400 text-sm ${
                  loadComments ? " animate-pulse" : ""
                }`}
              >
                {loadComments ? "Loading..." : "See more"}
              </button>
            </div>
          )}
          {visibleComments > 3 && (
            <div className="flex justify-start items-center">
              <button
                onClick={() => loadCommentsHandler(visibleComments - 3)}
                className="mt-2 p-2  font-normal rounded-lg text-blue-900 hover:text-blue-400 text-sm "
              >
                Less
              </button>
            </div>
          )}

          <div className=" relative mt-10">
            {submitting && (
              <div className="absolute top-0 left-0 w-full h-full bg-lavender bg-opacity-40 z-10 flex justify-center items-center">
                <div className=" rounded-xl">
                  <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-purple"></div>
                </div>
              </div>
            )}

            <form
              onSubmit={postComment}
              className=" flex flex-col gap-2 relative"
            >
              {/* <label htmlFor="comment">Comment:</label> */}
              <textarea
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id="comment"
                cols={30}
                rows={4}
                className=" px-8 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent border-transparent bg-lavender text-darkgrey rounded-lg"
                placeholder="Enter your comment here"
              ></textarea>

              <div
                onClick={() => setOpenEmojiSelector((prev) => !prev)}
                ref={buttonRef}
                className=" absolute bottom-2 left-2 hover:cursor-pointer hover:bg-purple hover:text-white hover:rounded-[50%] p-1"
              >
                <MdOutlineEmojiEmotions className=" text-2xl" />
              </div>

              {openEmojiSelector && (
                <div ref={toggleref} className="absolute bottom-32 right-0">
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    lazyLoadEmojis={true}
                  />
                </div>
              )}

              <button
                type="submit"
                className=" absolute right-2 bottom-2 bg-purple text-white py-2 px-3 border border-blue-900 font-bold rounded-lg hover:bg-white hover:text-purple hover:border-purple"
              >
                <IoMdSend className="text-xs" />
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default CommentsList;
