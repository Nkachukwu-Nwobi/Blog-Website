import connectDB from "@/libs/mongodb"
import Blogpost from "@/models/postModel"
import { useParams } from "next/navigation"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

interface Params {
    id: string;
}


export async function PUT(request: NextRequest, { params}:  { params: Params }){
    const { id } = params
    const { updatedTitle, updatedContent } = await request.json()
    await connectDB()
    await Blogpost.findByIdAndUpdate(id, {title: updatedTitle, content: updatedContent})
    return NextResponse.json({message: "Post updated"}, {status: 200})
    
}

export async function GET(request: NextRequest, { params}:  { params: Params }){
    const { id } = params
    await connectDB()
    const post = await Blogpost.findOne({_id: id})

    return NextResponse.json({post}, {status: 200})
    
}