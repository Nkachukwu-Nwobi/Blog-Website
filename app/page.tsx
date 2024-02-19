"use client"

import { useEffect, useState } from 'react';
import Posts from "@/components/Posts";
import dotenv from 'dotenv';

dotenv.config();


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const base_url = process.env.base_url as string;

        const res = await fetch(`${base_url}/api/posts`, {
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
