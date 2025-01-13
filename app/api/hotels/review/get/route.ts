import connectMongo from "@/config/dbConnect";
import Review from "@/model/reviewModel";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hotelId = searchParams.get("hotelId");
  try {
    await connectMongo();
    const reviews = await Review.find({ hotel: hotelId }).populate({
      path: "user",
      select: "name _id email image",
      model: User,
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
