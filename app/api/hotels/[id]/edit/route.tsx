import connectMongo from "@/config/dbConnect";
import Hotel from "@/model/hotelModel";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  try {
    await connectMongo();
    const updatedHotel = await Hotel.findByIdAndUpdate(params.id, data);
    revalidatePath("/");
    revalidatePath("/hotels/hotel-manage");
    return NextResponse.json({
      status: 200,
      updatedHotel,
      message: "Hotel updated successfully!",
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
