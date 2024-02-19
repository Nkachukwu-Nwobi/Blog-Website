"use client"

import { useEffect, useState } from 'react';
import Posts from "@/components/Posts";


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:3000/api/posts", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();

        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []); 

  return (
    <>
      <Posts posts={posts} />
    </>
  );
}
