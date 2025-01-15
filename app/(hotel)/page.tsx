import HotelDetailsCard from "@/components/ui/HotelDetailsCard";
import HotelPagination from "@/components/ui/Pagination";
import ShowError from "@/components/ui/ShowError";
import { fetchHotels } from "@/lib/api/fetch-api";
import Hotel from "@/types/hotel";
import { FaCircleInfo } from "react-icons/fa6";
type SearchParams = {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
  };
};
const HomePage = async ({ searchParams }: SearchParams) => {
  try {
    const page = Number(searchParams?.page || 1);
    const limit = Number(searchParams?.limit || 8);
    const search = searchParams?.search || "";
    const response = await fetchHotels({ page, limit, search });
    const { hotels, pagination } = response;

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
          {pagination && hotels?.length > 0 && (
            <HotelPagination pagination={pagination} />
          )}
        </section>
      </>
    );
  } catch (error) {
    return <ShowError error={error as Error} />;
  }
};

export default HomePage;
