import connectMongo from "@/config/dbConnect";
import { sendEmail } from "@/config/resend-email";
import Payment from "@/model/paymentModel";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const id = params.id;
    const data = await request.json();
    const updatePayment = await Payment.findByIdAndUpdate(id, data);
    const user = await User.findOne({ _id: updatePayment?.user });
    const res = await sendEmail(updatePayment, user?.email);
    console.log(res);
    return NextResponse.json({
      status: 200,
      updatePayment,
      message: "Payment updated successfully!",
    });
  } catch (error) {
    console.log(error);
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
