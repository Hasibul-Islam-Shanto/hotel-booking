import connectMongo from "@/config/dbConnect";
import Hotel from "@/model/hotelModel";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const deletedHotel = await Hotel.findByIdAndDelete(params.id);
    revalidatePath("/");
    revalidatePath("/hotels/hotel-manage");
    return NextResponse.json({
      status: 200,
      deletedHotel,
      message: "Hotel deleted successfully!",
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
