"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function DeleteBtn({ id }: { id: string }) {
  const router = useRouter();

  async function deletePost() {
    const confirmed = confirm("Are you sure you want to delete this post?");
    const base_url = process.env.NEXT_PUBLIC_BASE_URL as string;

    if (confirmed) {
      const res = await fetch(`${base_url}/api/posts?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  }

  return (
    <button onClick={deletePost} className="text-red-500">
      <HiOutlineTrash size={28} />
    </button>
  );
}
