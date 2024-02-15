import Image from "next/image"
import profilepic from "@/public/profile-pic.jpeg"

export default function ProfilePic() {
  return (
    <div className="w-full mx-auto">
        <Image src={profilepic} 
        className="border-2 border-white dark:border-white-100 rounded-full mx-auto drop-shadow-xl"
        alt="ProfilePic"
        width={50}
        height={50}
        priority={true}
        />

    </div>
  )
}
