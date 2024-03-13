import connectDB from "@/libs/mongodb";
import Blogpost from "@/models/postModel";
import Comment from "@/models/commentModel";
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

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;

  const post = await Blogpost.findOne({ _id: id });

  //   const Comment = await Comment.find() // Assuming your comment model is in a file called 'commentModel.js'

  // Comment.find({})
  //   .populate('postId') // Populate the postId field with details of the associated blog post
  //   .populate('userId') // Populate the userId field with details of the associated user
  //   .exec((err, comments) => {
  //     if (err) {
  //       console.error(err);
  //       // Handle error
  //       return;
  //     }
  //     // Now, comments array contains each comment with postId and userId fields populated
  //     console.log(comments);
  //     // Handle comments
  //   });

  return NextResponse.json({ post }, { status: 200 });
}

export async function POST(request: NextRequest) {
  await connectDB();

  if (request.body === null) {
    // Return an error response
    return NextResponse.json(
      { error: "Request body is empty" },
      { status: 400 }
    );
  }

  // Parse the request body as JSON
  const content = await request.body;

  await Comment.create({ content });

  return NextResponse.json({ message: "Post created" }, { status: 201 });
}
