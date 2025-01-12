import { sendEmail } from "@/app/actions";
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
    const updatePayment = await Payment.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    }).populate([
      {
        path: "hotel",
        select: "propertyName propertyLocation images pricePerNight",
      },
      {
        path: "user",
        select: "-password",
      },
    ]);
    if (updatePayment) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await sendEmail(updatePayment);
      return NextResponse.json({
        status: 200,
        updatePayment,
        message: "Payment updated successfully!",
      });
    }
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
