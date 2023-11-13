import connectDB from "@/database/connection";
import { closeDB } from "@/database/connection";
import User from "@/database/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //DB connection
    await connectDB();
    await mongoose.connection;

    const userData = await User.find({}).exec();
    closeDB();
    return NextResponse.json({ userData });
  } catch (error) {
    throw new Error(error.message);
  }
}
