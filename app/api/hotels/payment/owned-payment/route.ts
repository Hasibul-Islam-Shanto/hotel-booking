import connectMongo from "@/config/dbConnect";
import Payment from "@/model/paymentModel";
import User from "@/model/userModel";
import Hotel from "@/model/hotelModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    await connectMongo();
    const email = searchParams.get("email");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 8);
    const skip = (page - 1) * limit;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }
    const totalPayments = await Payment.countDocuments({ user: user?._id });
    const totalPages = Math.ceil(totalPayments / limit);
    const ownedPayment = await Payment.find({
      user: user?._id,
      status: "completed",
    })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "hotel",
          model: Hotel,
        },
        {
          path: "user",
          select: "-password",
        },
      ])
      .skip(skip)
      .limit(limit);
    return NextResponse.json({
      status: 200,
      bookings: ownedPayment,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalPayments,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
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
