import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import Link from "next/link";

interface Posts {
  _id: string;
  title: string;
  content: string;
  date: string;
}



export default async function Posts({ posts }: { posts: Posts[]}) {
  

  return (
    <>
    <div className="grid grid-cols-2 grid-rows-2 gap-10 my-20">
    {posts.map((post: Posts) => (
        <div
          key={post._id}
          className="p-4 border border-blue-900 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          <div>
          
          <h2 className="font-bold text-2xl ">
          <Link className=" text-bold text-blue-900 hover:text-blue-900/50" href={`/articles/${post._id}`}>

          {post.title}</Link></h2>
            
            
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

    </div>
    
      
    </>
  );
}
