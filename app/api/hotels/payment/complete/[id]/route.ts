import connectMongo from "@/config/dbConnect";
import Payment from "@/model/paymentModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const id = params.id;
    const data = await request.json();
    const isPaymentExist = await Payment.findById({ _id: id });
    if (!isPaymentExist) {
      return NextResponse.json({
        status: 400,
        message: "Payment not found!",
      });
    }
    const updatePayment = await Payment.findByIdAndUpdate({ _id: id }, data);

    return NextResponse.json({
      status: 200,
      updatePayment,
      message: "Payment updated successfully!",
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
