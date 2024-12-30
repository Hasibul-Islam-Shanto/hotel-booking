import connectMongo from "@/config/dbConnect";
import Hotel from "@/model/hotelModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const hotel = await Hotel.findById(params.id).populate({
      path: "user",
      select: "name",
    });
    return NextResponse.json({
      status: 200,
      hotel,
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
