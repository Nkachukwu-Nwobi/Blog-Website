import connectDB from "@/libs/mongodb";
import Blogpost from "@/models/postModel";
import Comments from "@/models/commentModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import cloudinary from "@/libs/cloudinary";

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
    // Read the image file data and store it in Cloudinary
    const arrayBuffer = await new Response(image).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a promise wrapper for the upload stream
    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "BLOGPOSTS",
            transformation: [
              { width: 500, height: 500, crop: "scale" },
              { quality: "auto:best", fetch_format: "auto" },
            ],
          }, // Specify the folder here
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(buffer);
      });
    };

    try {
      const uploadResponse: any = await uploadStream();

      console.log(uploadResponse);

      imgData = {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
      console.log(imgData);
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to upload image" },
        { status: 500 }
      );
    }
  }

  await Blogpost.create({ title, content, image: imgData?.url });

  return NextResponse.json({ message: "Post created" }, { status: 201 });
}

export async function GET(request: NextRequest) {
  await connectDB();

  const posts = await Blogpost.find().exec();

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const comments = await Comments.find({ postId: post._id })
        .sort({ createdAt: 1 })
        .exec();
      return { ...post.toObject(), comments };
    })
  );
  return NextResponse.json({ postsWithComments }, { status: 200 });
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
