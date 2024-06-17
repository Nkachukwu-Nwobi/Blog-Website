import connectDB from "@/libs/mongodb";
import Blogpost from "@/models/postModel";
import Comments from "@/models/commentModel";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface Params {
  id: string;
}

//get comments for a post

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;

  try {
    await connectDB();

    const commentsList = await Comments.find({ postId: id });

    return NextResponse.json({ commentsList }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

//post comment

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    if (request.body === null) {
      // Return an error response
      return NextResponse.json({ error: "no comment posted" }, { status: 400 });
    }
    await connectDB();

    // Parse the request body as JSON

    const { content } = await request.json();

    const { id } = params;

    const newComment = await Comments.create({ content, postId: id });

    return NextResponse.json(
      { message: "Comment successfully posted", newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to post comment" },
      { status: 500 }
    );
  }
}
