
import { HiChatAlt } from "react-icons/hi";

import Link from 'next/link'

export default function CommentBtn({id}: {id: string}) {
  return (
    <>
        <Link className="text-white" href={`/editPost/${id}`}>
        <HiChatAlt size={24}/>
        </Link>
    
    </>
    
  )
}
