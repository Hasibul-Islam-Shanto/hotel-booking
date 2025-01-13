import connectMongo from "@/config/dbConnect";
import Hotel from "@/model/hotelModel";
import Review from "@/model/reviewModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const hotel = await Hotel.findById(params.id).populate({
      path: "user",
      select: "name _id email image",
    });
    const reviews = await Review.find({ hotel: hotel?._id });
    const totalRating = reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );
    const averageRating = reviews.length
      ? (totalRating / reviews.length).toFixed(1)
      : "0";
    const hotelWithRating = {
      ...hotel?.toObject(),
      averageRating: parseFloat(averageRating),
      totalReviews: reviews.length,
    };
    return NextResponse.json({
      status: 200,
      hotel: hotelWithRating,
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
      message: "Something went wrong!",
    });
  }
}
