import connectDB from "@/libs/mongodb"
import Blogpost from "@/models/postModel"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"



export async function POST(request: NextRequest){

    const {title, content} = await request.json()
    await connectDB()
    await Blogpost.create({title, content})
    return NextResponse.json({message: "Post created"}, {status: 201})

}

export async function GET(request: NextRequest){
    await connectDB()
    const posts = await Blogpost.find()
    return NextResponse.json({posts}, {status: 200})

}

export async function DELETE(request: NextRequest, ){
    const id = request.nextUrl.searchParams.get('id')

    await connectDB();
    
    if (!id || typeof id !== 'string') {
        return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }
    
    await Blogpost.findByIdAndDelete(id)
    return NextResponse.json({message: "Post deleted"}, {status: 200})

}

