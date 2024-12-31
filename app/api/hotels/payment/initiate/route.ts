import { auth } from "@/auth";
import connectMongo from "@/config/dbConnect";
import Payment from "@/model/paymentModel";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const session = await auth();
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "User not found!",
      });
    }
    const data = await request.json();
    console.log(data);
    const payment = new Payment({
      checkInDate: data.checkIn,
      checkoutDate: data.checkOut,
      guests: data.guests,
      hotel: data.hotel,
      user: user._id,
    });
    await payment.save();
    return NextResponse.json({
      status: 200,
      payment,
      message: "Payment Initiated",
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
