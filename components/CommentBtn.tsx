
import { HiChatAlt } from "react-icons/hi";

import Link from 'next/link'

interface FeaturedPosts {
  _id: string;
  title: string;
  image: string;
  content: string;
  date: string;
}

export default function CommentBtn({post}: {post: FeaturedPosts}) {
  return (
    <>
        <Link className="text-white" href={`/articles/${post._id}`}>
        <HiChatAlt size={28}/>
        </Link>
    
    </>
    
  )
}
