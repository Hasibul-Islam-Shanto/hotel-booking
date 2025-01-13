import { auth } from "@/auth";
import connectMongo from "@/config/dbConnect";
import Review from "@/model/reviewModel";
import User from "@/model/userModel";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const session = await auth();
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "User not found",
      });
    }
    const data = await request.json();
    const isReviewExist = await Review.findOne({
      user: user._id,
      hotel: data.hotelId,
    });

    if (isReviewExist) {
      return NextResponse.json({
        status: 400,
        message: "You have already posted a review for this hotel",
      });
    }

    const review = new Review({
      user: user._id,
      hotel: data.hotelId,
      rating: data.rating,
      description: data.description,
    });
    await review.save();
    revalidatePath(`/hotels/${data?.hotelId}`);
    revalidatePath("/");
    revalidatePath(`/hotels/review/get?hotelId=${data?.hotelId}`);
    return NextResponse.json({
      status: 200,
      review,
      message: "Review posted successfully",
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
