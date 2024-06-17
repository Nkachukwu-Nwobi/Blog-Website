import connectDB from "@/libs/mongodb";
import Blogpost from "@/models/postModel";
import Comments from "@/models/commentModel";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface Params {
  id: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;
  const { updatedTitle, updatedContent } = await request.json();
  await connectDB();
  await Blogpost.findByIdAndUpdate(id, {
    title: updatedTitle,
    content: updatedContent,
  });
  return NextResponse.json({ message: "Post updated" }, { status: 200 });
}

//get single post with comments

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;

  try {
    await connectDB();

    // Find the post by ID
    const post = await Blogpost.findOne({ _id: id });
    // Use .lean() to get a plain JavaScript object

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Find comments associated with the post ID
    const comments = await Comments.find({ postId: id }).sort({ createdAt: 1 });

    // Attach the comments to the post object
    const postWithComments = { ...post.toObject(), comments };

    // Return the post with comments
    return NextResponse.json({ post, postWithComments }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch posts and comments" },
      { status: 500 }
    );
  }
}
