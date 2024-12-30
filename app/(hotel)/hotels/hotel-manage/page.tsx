import { auth } from "@/auth";
import HotelManageHeader from "@/components/hotel-manage/HotelManageHeader";
import HotManageCard from "@/components/hotel-manage/HotManageCard";
import { fetchOwnerHotels } from "@/lib/api/fetch-api";
import Hotel from "@/types/hotel";

const HotelManage = async () => {
  const session = await auth();

  const response = await fetchOwnerHotels(
    session?.user ? (session.user.email as string) : ""
  );
  const hotels = response.hotels;
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <HotelManageHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels?.length === 0 && (
            <div className="w-full h-[80vh] flex items-center justify-center">
              <h1 className="text-2xl font-bold text-zinc-400">
                No Hotels Found!
              </h1>
            </div>
          )}
          {hotels?.length > 0 &&
            hotels.map((hotel: Hotel) => (
              <HotManageCard key={hotel._id} hotel={hotel} />
            ))}
          {/* <HotManageCard />
          <HotManageCard />
          <HotManageCard /> */}
        </div>
      </div>
    </>
  );
};

export default HotelManage;
