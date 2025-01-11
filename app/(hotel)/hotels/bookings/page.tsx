import { auth } from "@/auth";
import HotelBookingContainer from "@/components/booking/HotelBookingContainer";
import HotelPagination from "@/components/ui/Pagination";
import ShowError from "@/components/ui/ShowError";
import { fetchBookings } from "@/lib/api/fetch-api";

type SearchParams = {
  page: string;
  limit: string;
};

const Bookings = async ({ searchParams }: { searchParams: SearchParams }) => {
  try {
    const session = await auth();
    const email = session?.user?.email ?? null;
    const page = Number(searchParams?.page || 1);
    const limit = Number(searchParams?.limit || 8);
    const response = await fetchBookings(email, page, limit);
    const { bookings, pagination } = response;

    return (
      <>
        <HotelBookingContainer bookings={bookings} />
        {bookings?.length > 0 && (
          <HotelPagination pagination={pagination} path="/hotels/bookings" />
        )}
      </>
    );
  } catch (error) {
    return <ShowError error={error as Error} />;
  }
};

export default Bookings;
