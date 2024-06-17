import connectDB from "@/libs/mongodb";
import Blogpost from "@/models/postModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");

  await connectDB();

  if (!query || typeof query !== "string") {
    return NextResponse.json({ message: "no filtered words" }, { status: 400 });
  }

  // Define a filter object to be used for filtering posts

  const filter: { $or?: { [key: string]: RegExp }[] } = {};
  if (query) {
    const regex = new RegExp(query, "i");
    filter.$or = [{ title: regex }, { content: regex }];
  }

  const posts = await Blogpost.find(filter);

  return NextResponse.json({ posts });
}
