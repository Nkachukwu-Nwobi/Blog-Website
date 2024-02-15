"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function addPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <Link
          className="bg-blue-900 text-white p-2 border border-blue-900 font-bold rounded-lg hover:bg-white hover:text-blue-900 hover:border-blue-900"
          href={"/"}
        >
          Back to home
        </Link>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          id="title"
          name="title"
          className="border border-blue-900 px-5 py-2"
          type="text"
          placeholder="Enter title of post"
        />
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <label htmlFor="content">Content</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          rows={5}
          className="border border-blue-900 px-5 py-2"
          id="content"
          name="content"
          placeholder="Enter post content"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          className="bg-green-500 mt-5 p-3 border font-bold text-white w-full "
        >
          Post
        </button>
      </div>
    </form>
  );
}
