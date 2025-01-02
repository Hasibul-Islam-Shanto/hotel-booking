import HotelDetailsCard from "@/components/ui/HotelDetailsCard";
import { fetchHotels } from "@/lib/api/fetch-api";
import Hotel from "@/types/hotel";
import { FaCircleInfo } from "react-icons/fa6";

const HomePage = async () => {
  const response = await fetchHotels();
  const hotels = response.hotelsWithRatings;
  console.log(response);
  return (
    <>
      <section className="px-6">
        {hotels?.length === 0 && (
          <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-2">
              <FaCircleInfo className="text-4xl font-bold text-zinc-400" />
              <h1 className="text-5xl font-bold text-zinc-400">
                No Hotels Found!
              </h1>
            </div>

            <p className="text-zinc-400 text-xl">Please check back later</p>
          </div>
        )}
        {hotels?.length > 0 && (
          <div className="max-w-7xl mx-auto min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotels.map((hotel: Hotel) => (
              <HotelDetailsCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default HomePage;
