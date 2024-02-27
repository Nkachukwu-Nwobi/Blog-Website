"use client"

import { useEffect, useState } from 'react';
import Posts from "@/components/Posts";
import Loading from "../Loading";
import Link from "next/link";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL as string;

      try {
        console.log(base_url);
        const res = await fetch(`${base_url}/api/posts`);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();

        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); 
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
      <Link
            className="bg-white p-2 text-blue-900 font-bold hover:bg-blue-900 hover:text-white hover:border-black rounded-lg border border-blue-900"
            href="/addPost"
          >
            Add Post
      </Link>

      
      {loading ? (
        <Loading />
      ) : (
          <Posts posts={posts} />
        
      )}
    </>
  );
}
