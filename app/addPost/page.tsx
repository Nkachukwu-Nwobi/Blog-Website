"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setErrorMessage(null);
        setSuccessMessage("Post created successfully");

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 2000);
      } else {
        setSuccessMessage(null);
        setErrorMessage("Failed to create post");

      }
    } catch (error) {
      console.error("Error creating post:", error);
      setErrorMessage("Failed to create post");
    }
  }

  return (
    <main className="max-w-3xl mx-auto mb-6 pt-10">
      {successMessage && (
        <p className="text-green-700 mt-5 rounded-xl sticky top-[15%] z-10 w-4/12 mx-auto bg-green-200 text-center ">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="text-red-700 mt-5 rounded-xl sticky top-[15%] z-10 w-4/12 mx-auto bg-red-200 text-center">
          {errorMessage}
        </p>
      )}

      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="bg-blue-900 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 hover:border-blue-900 border border-blue-900"
        >
          Go back
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-5 flex flex-col gap-2">
          <label className="text-2xl" htmlFor="title">
            Title
          </label>
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

        <div className="mt-5 flex flex-col gap-2">
          <label className="text-2xl" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={300}
              height={300}
              priority={true}
              style={{ marginTop: "2rem" }}
            />
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <label className="text-2xl" htmlFor="content">
            Content
          </label>
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
            className="bg-green-500 mt-5 p-3 border font-bold text-white w-full hover:bg-green-700 hover:border-green-700 rounded-lg"
          >
            Post
          </button>
        </div>
      </form>
    </main>
  );
}
