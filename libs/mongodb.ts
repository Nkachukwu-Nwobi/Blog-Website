import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


export default async function connectDB(){
    try {

       await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("database connected")

    } catch (error) {
        console.log(error)
        
    }
}