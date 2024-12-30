import connectMongo from "@/config/dbConnect";
import Hotel from "@/model/hotelModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const hotels = await Hotel.find();
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
