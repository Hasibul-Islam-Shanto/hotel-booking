import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/config/dbConnect";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  try {
    await connectMongo();
    // console.log("Connected to MongoDB");
    if (!name || !email || !password) {
      throw new Error("All fields are required!");
    }
    const isUserExist = await User.findOne({ email });
    // console.log(isUserExist);
    if (isUserExist) {
      return NextResponse.json({
        status: 500,
        message: "User already exist!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return NextResponse.json({
      status: 201,
      user,
      message: "User registered successfully!",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 500,
        message: error.message,
      });
    } else {
      return NextResponse.json({
        status: 500,
        message: "Something went wrong!",
      });
    }
  }
}
