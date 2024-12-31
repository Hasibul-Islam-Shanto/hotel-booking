import { auth } from "@/auth";
import connectMongo from "@/config/dbConnect";
import Hotel from "@/model/hotelModel";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const session = await auth();
  console.log(session);

  try {
    await connectMongo();
    const user = await User.findOne({ email: email });
    const hotels = await Hotel.find({ user: user?._id });
    return NextResponse.json({
      status: 200,
      hotels,
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
