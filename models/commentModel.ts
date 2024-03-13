import mongoose, { Schema, Document } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogpost",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
