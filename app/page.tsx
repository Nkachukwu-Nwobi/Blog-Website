import Image from "next/image";
import Posts from "@/components/Posts";
import SearchBar from "@/components/SearchBar";





async function getPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {}
}



export default async function Home() {

  const { posts } = await getPosts();


  return (

    <>
    {/* <SearchBar /> */}
    
    <Posts posts={posts} />
    

    </>
    
  )
}
