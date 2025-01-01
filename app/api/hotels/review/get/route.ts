import connectMongo from "@/config/dbConnect";
import Review from "@/model/reviewModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const reviews = await Review.find().populate({
      path: "user",
      select: "name _id email",
    });
    return NextResponse.json({
      status: 200,
      reviews,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 500,
        message: error.message,
      });
    }
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
}
