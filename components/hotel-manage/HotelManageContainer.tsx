import Hotel from "@/types/hotel";
import HotelManageHeader from "./HotelManageHeader";
import HotManageCard from "./HotManageCard";

const HotelManageContainer = ({ hotels }: { hotels: Hotel[] }) => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <HotelManageHeader />
        {hotels?.length === 0 && (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <h1 className="text-2xl font-bold text-zinc-400">
              No Hotels Found!
            </h1>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels?.length > 0 &&
            hotels.map((hotel: Hotel) => (
              <HotManageCard key={hotel._id} hotel={hotel} />
            ))}
        </div>
      </div>
    </>
  );
};

export default HotelManageContainer;
