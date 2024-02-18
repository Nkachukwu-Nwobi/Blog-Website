"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Post {
  _id: string;
  image?: { data: Buffer; contentType: string }; // Make image optional
  title: string;
  content: string;
  date: string;
}

export default function Article({ post }: { post: Post }) {
  const [imageSource, setImageSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadImageSource = async () => {
      if (post.image) {
        const base64Image = `data:${post.image.contentType};base64,${Buffer.from(
          post.image.data
        ).toString("base64")}`;
        setImageSource(base64Image);
      }
    };
    loadImageSource();
  }, [post]);

  return (
    <>
      <article className="my-20">
        <div className="mb-5">
          <Link
            className="bg-blue-900 text-white p-2 border border-blue-900 font-bold rounded-lg hover:bg-white hover:text-blue-900 hover:border-blue-900"
            href={"/"}
          >
            Back to home
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="text-4xl mb-5 mt-5">{post.title}</h2>
          <h5 className="mb-5 text-slate-600 text-lg">
            {new Intl.DateTimeFormat("en-NG", {
              dateStyle: "long",
              timeStyle: "short",
              timeZone: "Africa/Lagos",
            }).format(new Date(post.date))}
          </h5>
        </div>
        {imageSource ? (

        <div className="flex justify-start gap-5 border-b-2 border-t-2 border-blue-900 py-10">
        
          <div className=" w-1/2">
            <Image src={imageSource} alt="Blogpost Image" width={550} height={500} priority={true} />
            
          </div>

        <div className="w-1/2">
          <p>{post.content}</p>
        </div>

        </div>
        ) : (
          <div className="w-full border-b-2 border-t-2 border-blue-900 py-10">
          <p>{post.content}</p>
        </div>
        )}

        
      </article>
    </>
  );
}
