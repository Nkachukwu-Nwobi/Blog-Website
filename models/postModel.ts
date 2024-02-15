import mongoose, { Schema, Document } from "mongoose";

const postSchema = new Schema({
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
    },
    {
        timestamps: true,
    }

)

const Blogpost = mongoose.models.Blogpost ||  mongoose.model('Blogpost', postSchema)

export default Blogpost