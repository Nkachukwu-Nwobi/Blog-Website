"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function addPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
                              
  function handleImageChange (e: React.ChangeEvent<HTMLInputElement>) {

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
  };


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

      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
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

      <div className="mt-5 flex flex-col gap-2">
        <label className="text-2xl" htmlFor="title">Title</label>
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
        <label className="text-2xl" htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange} // Store the selected image file
        />
        {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ marginTop: '2rem', maxWidth: '30%', maxHeight: '300px' }} />
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label className="text-2xl" htmlFor="content">Content</label>
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
