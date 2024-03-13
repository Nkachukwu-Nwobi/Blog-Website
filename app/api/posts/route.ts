import connectDB from "@/libs/mongodb";
import Blogpost from "@/models/postModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import multer from "multer";
import path from "path";



export async function POST(request: NextRequest) {


  const formData = await request.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const image = formData.get("image") as File | null;

  if (!title || !content) {
    throw new Error("Title or content is missing");
  }

  await connectDB();

  let imgData;
  if (image) {
    // Read the image file data and store it in MongoDB
    const arrayBuffer = await new Response(image).arrayBuffer();
    imgData = {
      data: Buffer.from(arrayBuffer),
      contentType: image.type,
    };
  }

  console.log(imgData);

  await Blogpost.create({ title, content, image: imgData });

  return NextResponse.json({ message: "Post created" }, { status: 201 });
}

export async function GET(request: NextRequest) {
  await connectDB();
  const posts = await Blogpost.find();
  return NextResponse.json({ posts }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connectDB();

  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  await Blogpost.findByIdAndDelete(id);
  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}
