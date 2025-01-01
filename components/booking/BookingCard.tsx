"use client";
import { Payment } from "@/types/payment";
import { formattedDate } from "@/utils/helper";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { generatePDF } from "@/utils/receipt-download";
import { useState } from "react";
import ImageGallery from "../hotel/ImageGallery";
import Modal from "../ui/Modal";
import { FiX } from "react-icons/fi";

const BookingCard = ({ booking }: { booking: Payment }) => {
  const [isTripDetailsOpen, setIsTripDetailsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4">
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height={100}
            width={100}
            alt="Property Thumbnail"
            className="w-24 h-24 object-cover rounded-md"
          />
          <div>
            <h2 className="text-lg text-zinc-800 font-semibold">
              {booking?.hotel?.propertyName}
            </h2>
            <p className="text-zinc-500 text-sm">
              Booking Date: {formattedDate(booking?.createdAt)}
            </p>
            <p className="text-zinc-500 text-sm">
              Booking Code: {booking?._id?.slice(0, 6)}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsTripDetailsOpen(true)}
            className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:brightness-90"
          >
            View Trip Details
          </button>
          <button
            onClick={() => generatePDF(booking)}
            className="px-3 py-2 flex items-center gap-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FaDownload className="text-gray-600" />
            Download Receipt
          </button>
        </div>
      </div>
      {isTripDetailsOpen && (
        <Modal>
          <div className="w-[80%] flex flex-col justify-center items-center bg-white p-4 rounded-lg">
            <div className="w-full flex justify-end">
              <button onClick={() => setIsTripDetailsOpen(false)}>
                <FiX className="text-3xl" />
              </button>
            </div>
            <ImageGallery images={booking?.hotel?.images} />
            <div className="flex p-2 justify-between items-start w-full">
              <div>
                <h2 className="text-lg text-zinc-800 font-semibold">
                  {booking?.hotel?.propertyName}
                </h2>
                <p className="text-zinc-500 text-sm">
                  Location: {booking?.hotel?.propertyLocation}
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Check-in Date: {formattedDate(booking?.checkInDate)}
                </p>
                <p className="text-zinc-500 text-sm">
                  Checkout Date: {formattedDate(booking?.checkoutDate)}
                </p>
                <p className="text-zinc-500 text-sm">
                  Guests: {booking?.guests}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm">
                  Total Costs: ${booking?.totalCosts}
                </p>
                <p className="text-zinc-500 text-sm">
                  Payment Status: {booking?.status}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BookingCard;
