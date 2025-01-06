import connectMongo from "@/config/dbConnect";
import Payment from "@/model/paymentModel";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  try {
    await connectMongo();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }
    const ownedPayment = await Payment.find({
      user: user?._id,
      status: "completed",
    }).populate({
      path: "hotel user",
      select: "-password",
    });
    return NextResponse.json({
      status: 200,
      bookings: ownedPayment,
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
