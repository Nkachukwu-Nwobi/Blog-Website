"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Posts from "@/components/Posts";

export default function SearchResults() {
    const searchParams = useSearchParams()
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const query = searchParams.get('query')
      const res = await fetch(`http://localhost:3000/api/posts/search?query=${query}`);
      const data = await res.json();
      console.log(data)
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
