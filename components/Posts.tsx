import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import Link from "next/link";

interface Posts {
  _id: string;
  title: string;
  content: string;
  date: string;
}

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

export default async function Posts() {
  const { posts } = await getPosts();

  return (
    <>
      {posts.map((post: Posts) => (
        <div
          key={post._id}
          className="p-4 border border-blue-900 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{post.title}</h2>
            <h5 className="mb-5 text-slate-600">
              {new Intl.DateTimeFormat("en-NG", {
                dateStyle: "long",
                timeStyle: "short",
                timeZone: "Africa/Lagos",
              }).format(new Date(post.date))}
            </h5>
            <p>{post.content.slice(0, 800)}...<Link className=" text-bold text-blue-900" href={`/articles/${post._id}`}>
            Read More
            </Link></p>
              
          </div>
          <div className="flex gap-3">
            <div>
              <EditBtn id={post._id} />
            </div>
            <div>
              <DeleteBtn id={post._id} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
