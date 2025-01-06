import connectMongo from "@/config/dbConnect";
import Hotel from "@/model/hotelModel";
import Review from "@/model/reviewModel";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    await connectMongo();
    const user = await User.findOne({ email: email });
    const hotels = await Hotel.find({ user: user?._id });
    const reviews = await Review.find();
    const hotelsWithRatings = hotels.map((hotel: typeof Hotel.prototype) => {
      const hotelReviews = reviews.filter(
        (review) => review.hotel.toString() === hotel._id.toString()
      );
      const totalRating = hotelReviews.reduce(
        (sum, review) => sum + (review.rating || 0),
        0
      );
      const averageRating = hotelReviews.length
        ? (totalRating / hotelReviews.length).toFixed(1)
        : "0";

      return {
        ...hotel.toObject(),
        averageRating: parseFloat(averageRating),
        totalReviews: hotelReviews.length,
      };
    });
    return NextResponse.json({
      status: 200,
      hotels: hotelsWithRatings,
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
