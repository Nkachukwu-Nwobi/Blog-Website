"use client"

import { useEffect, useState } from 'react';
import Posts from "@/components/Posts";
import Loading from "../Loading";
import Link from "next/link";
import FeaturedPost from "./featuredPost";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const base_url = process.env.NEXT_PUBLIC_BASE_URL as string;

      try {
        
        const res = await fetch(`${base_url}/api/posts`);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        
        setPosts(data.postsWithComments);
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
    <main className='max-w-6xl mx-auto pt-10'>
      <section>
        <Link
            className="bg-white p-2 text-blue-900 font-bold hover:bg-blue-900 hover:text-white hover:border-black rounded-lg border border-blue-900 "
            href="/addPost"
          >
            Add Post
      </Link>

      </section>

      <section className='mt-10'>
      {loading ? (
        <Loading />
      ) : (
        <>
        <FeaturedPost posts={posts} />
          <Posts posts={posts} />
        </>
        
      )}

      </section>
    


    </main>
      
    </>
  );
}
