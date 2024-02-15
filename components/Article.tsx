import Link from "next/link";

interface Posts {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export default function Article({ post }: { post: Posts }) {
  try {
  } catch (error) {}

  return (
    <>
      <article>
        <div className="mb-5">
          <Link
            className="bg-blue-900 text-white p-2 border border-blue-900 font-bold rounded-lg hover:bg-white hover:text-blue-900 hover:border-blue-900"
            href={"/"}
          >
            Back to home
          </Link>
        </div>

        <div>
          <h2>{post.title}</h2>
          <h5 className="mb-5 text-slate-600">
            {new Intl.DateTimeFormat("en-NG", {
              dateStyle: "long",
              timeStyle: "short",
              timeZone: "Africa/Lagos",
            }).format(new Date(post.date))}
          </h5>
        </div>
        <div>
          <p>{post.content}</p>
        </div>
      </article>
    </>
  );
}
