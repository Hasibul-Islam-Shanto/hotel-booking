import connectMongo from "@/config/dbConnect";
import Payment from "@/model/paymentModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const payment = await Payment.findById(params.id).populate({
      path: "hotel",
      select: "propertyName propertyLocation images pricePerNight ",
    });
    return NextResponse.json({
      status: 200,
      payment,
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
