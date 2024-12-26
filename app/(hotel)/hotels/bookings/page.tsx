import BookingCard from "@/components/booking/BookingCard";

const Bookings = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

        <div className="space-y-4">
          <BookingCard />
          <BookingCard />
          <BookingCard />
          <BookingCard />
          <BookingCard />
        </div>
      </div>
    </>
  );
};

export default Bookings;
