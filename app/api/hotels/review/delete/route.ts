import { auth } from "@/auth";
import connectMongo from "@/config/dbConnect";
import Review from "@/model/reviewModel";
import User from "@/model/userModel";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const session = await auth();
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "User not found",
      });
    }

    const isUserOwnTheReview = await Review.findOne({
      _id: id,
      user: user._id,
    });

    if (!isUserOwnTheReview) {
      return NextResponse.json({
        status: 400,
        message: "You are not authorized to delete this review",
      });
    }
    await Review.findByIdAndDelete({ _id: id });
    revalidatePath(`/hotels/${isUserOwnTheReview._id}`);
    return NextResponse.json({
      status: 200,
      message: "Review deleted successfully",
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
