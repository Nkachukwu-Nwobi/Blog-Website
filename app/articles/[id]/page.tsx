import Article from "@/components/Article";


interface Params {
    id: string;
}

interface Posts {
    _id: string;
    title: string;
    content: string;
    date: string;
    comments: { content: string; createdAt: string }[];
}


async function getPostById(id: string){
    try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch post");
        }
        const data = await res.json();
        
        return data.postWithComments
        

    } catch (error) {
        console.log(error);
    }
}

export default async function FullPost( { params}:  { params: Params }) {

    const { id } = params

    const post:  Posts = await getPostById(id);
    console.log("post", post)
    console.log("post and comments", post)


  return (
    <>
    <Article post={post} />
    
    </>
  )
}
