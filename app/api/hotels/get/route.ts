import connectMongo from "@/config/dbConnect";
import Hotel from "@/model/hotelModel";
import Review from "@/model/reviewModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    await connectMongo();
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 8);
    const skip = (page - 1) * limit;
    const searchQuery = searchParams.get("search") || "";
    const filter = searchQuery
      ? {
          propertyName: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
    const totalHotels = await Hotel.countDocuments();
    const totalPages = Math.ceil(totalHotels / limit);
    const hotels = await Hotel.find(filter).skip(skip).limit(limit);
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
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalHotels,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
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
