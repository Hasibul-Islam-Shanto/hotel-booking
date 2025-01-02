import { auth } from "@/auth";
import BookingCard from "@/components/booking/BookingCard";
import { fetchBookings } from "@/lib/api/fetch-api";
import { Payment } from "@/types/payment";

const Bookings = async () => {
  const session = await auth();
  const email = session?.user?.email ?? null;
  const response = await fetchBookings(email);
  const bookings = response.bookings;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        {bookings.length === 0 && (
          <div className="w-full flex justify-center items-center">
            <p className="text-gray-500 text-3xl font-bold">
              No bookings found!
            </p>
          </div>
        )}
        <div className="space-y-4">
          {bookings.map((booking: Payment) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookings;
