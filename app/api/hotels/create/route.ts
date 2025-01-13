import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/config/dbConnect";
import User from "@/model/userModel";
import Hotel from "@/model/hotelModel";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const session = await auth();
  const data = await request.json();
  try {
    await connectMongo();
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "User not found!",
      });
    }
    const hotel = new Hotel({
      ...data,
      user: user._id,
    });
    await hotel.save();
    revalidatePath("/");
    revalidatePath("/hotels/hotel-manage");
    return NextResponse.json({
      status: 200,
      hotel,
      message: "Hotel created successfully!",
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
