"use client"


import EditPostForm from '@/components/EditPostForm';

interface Params {
    id: string;
}

interface Posts {
    _id: string;
    title: string;
    content: string;
    date: string;
  }



async function getPostById(id: string){
    try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch post");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
}


export default async function editPost( { params}:  { params: Params }) {
    const { id } = params

    const { post }: { post: Posts } = await getPostById(id);
    const { title, content } = post;

    return (
        <>
            <EditPostForm id={id} title={title} content={content} />
        </>
    );
}
