"use client";
import { initiatePayment } from "@/lib/api/post-api";
import Hotel from "@/types/hotel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../ui/Spinner";
import { FaStar } from "react-icons/fa6";

const BookHotel = ({ hotel }: { hotel: Hotel }) => {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const isReserving = checkIn && checkOut && guests > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const submittedData = {
      checkIn,
      checkOut,
      guests,
      hotel: hotel?._id,
    };
    const res = await initiatePayment(submittedData);
    if (res.status === 200) {
      setLoading(false);
      router.push(`/hotels/payment/${res?.payment?._id}`);
    } else {
      setLoading(false);
      setError(res.message);
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 border"
        >
          {error && (
            <div className="w-full flex justify-center text-red-500 mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-xl font-bold">${hotel?.pricePerNight}</span>
              <span className="text-gray-600 ml-1">per night</span>
            </div>
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span>{hotel?.averageRating}</span>
            </div>
          </div>

          <div className="border rounded-lg mb-4">
            <div className="flex items-center px-1 border-b">
              <DatePicker
                placeholderText="Check in"
                className="p-3 w-full border-r"
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
              />
              <DatePicker
                placeholderText="Check out"
                className="p-3 w-full"
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
              />
            </div>
            <input
              type="number"
              placeholder="Guests"
              className="w-full p-3"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
            disabled={!isReserving && !loading}
          >
            {loading && <Spinner className="w-6 h-6 border-t-white" />}
            Reserve
          </button>

          <div className="text-center mt-4 text-gray-600">
            <p>You won&apos;t be charged yet</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookHotel;
