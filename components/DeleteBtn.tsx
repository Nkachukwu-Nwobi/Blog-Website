"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function DeleteBtn({ id }: { id: string }) {
  const router = useRouter();

  async function deletePost() {
    const confirmed = confirm("Are you sure you want to delete this post?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
        method: "DELETE",
      });

      if(res.ok){
        router.refresh()
      }
    }
  }

  return (
    <button onClick={deletePost} className="text-red-500">
      <HiOutlineTrash size={28} />
    </button>
  );
}
