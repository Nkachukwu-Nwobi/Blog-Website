import { HiPencilAlt } from "react-icons/hi"
import { FaPencilAlt } from "react-icons/fa"
import Link from 'next/link'

export default function EditBtn({id}: {id: string}) {
  return (
    <>
        <Link className="text-blue-900" href={`/editPost/${id}`}>
        <HiPencilAlt size={28}/>
        </Link>
    
    </>
    
  )
}
