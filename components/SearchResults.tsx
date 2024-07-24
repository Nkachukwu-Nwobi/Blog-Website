"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Posts from "@/components/Posts";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const query = searchParams.get("query");
      const base_url = process.env.NEXT_PUBLIC_BASE_URL as string;
      const res = await fetch(`${base_url}/api/posts/search?query=${query}`);
      const data = await res.json();

      setPosts(data.posts);
    }

    fetchData();
  }, [searchParams]);

  return (
    <div className="mt-5">
      <h1>Search Results</h1>
      <Posts posts={posts} />
    </div>
  );
}
