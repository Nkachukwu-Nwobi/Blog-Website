"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  content: string;
}

export default function EditPostForm({ id, title, content }: Props) {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL as string;
      const res = await fetch(`${base_url}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedTitle, updatedContent }),
      });

      if (!res.ok) {
        throw new Error("Failed to update post");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
            onChange={(e) => setUpdatedTitle(e.target.value)}
            value={updatedTitle}
            id="title"
            className="border border-blue-900 px-5 py-2"
            type="text"
            placeholder="Enter title of post"
          />
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <label htmlFor="blogContent">Content</label>
          <textarea
            onChange={(e) => setUpdatedContent(e.target.value)}
            value={updatedContent}
            rows={10}
            className="border border-blue-900 px-5 py-2"
            id="blogContent"
            placeholder="Enter post content"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="bg-green-500 mt-5 p-3 border font-bold text-white w-full "
          >
            Update post
          </button>
        </div>
      </form>
    </>
  );
}
