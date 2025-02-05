import { auth } from "@/auth";
import connectMongo from "@/config/dbConnect";
import Hotel from "@/model/hotelModel";
import Payment from "@/model/paymentModel";
import User from "@/model/userModel";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const session = await auth();
    const data = await request.json();
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "User not found!",
      });
    }
    const roomsCount = data?.guests > 2 ? Math.ceil(data?.guests / 2) : 1;
    const hotelDetails = await Hotel.findById({ _id: data?.hotel });

    if (
      hotelDetails &&
      (hotelDetails?.rooms < roomsCount ||
        hotelDetails?.bedrooms < roomsCount ||
        hotelDetails?.guests < data?.guests ||
        hotelDetails?.beds < roomsCount)
    ) {
      return NextResponse.json({
        status: 400,
        message: "Rooms are not available",
      });
    }

    await Hotel.findByIdAndUpdate(data?.hotel, {
      $inc: {
        rooms: -roomsCount,
        bedrooms: -roomsCount,
        guests: -data?.guests,
        beds: -roomsCount,
      },
    });

    const payment = new Payment({
      checkInDate: data.checkIn,
      checkoutDate: data.checkOut,
      guests: data.guests,
      hotel: data.hotel,
      user: user._id,
    });
    await payment.save();
    revalidatePath("/");
    revalidatePath(`/hotels/${data?.hotel}`);
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
