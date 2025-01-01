import PaymentDetailsDownload from "@/components/payment/PaymentDetailsDownload";
import { fetchPayment } from "@/lib/api/fetch-api";
import { formattedDate } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

import {
  FaCheckCircle,
  FaSuitcase,
  FaCommentAlt,
  FaEnvelope,
} from "react-icons/fa";

const PaymentStatus = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const response = await fetchPayment(params.id);
  const payment = response.payment;
  console.log(payment);
  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-3">
            <FaCheckCircle className="text-4xl text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-zinc-600 mb-8">
            Your booking has been confirmed. Check your email for details.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start gap-6 mb-6 pb-6 border-b">
            <Image
              src={payment?.hotel?.images[0]}
              height={50}
              width={50}
              alt="Property"
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {payment?.hotel?.propertyName}
              </h2>
              <div className="flex items-center mb-2">
                <i className="fas fa-star text-sm mr-1"></i>
                <span className="text-sm">4.6 (500+ reviews)</span>
              </div>
              <p className="text-zinc-600">
                {payment?.hotel?.propertyLocation}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Reservation Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-600 text-sm">Check-in</span>
                  <span className="text-zinc-500 text-sm">
                    {formattedDate(payment?.checkInDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 text-sm">Check-out</span>
                  <span className="text-zinc-500 text-sm">
                    {formattedDate(payment?.checkoutDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 text-sm">Guests</span>
                  <span className="text-zinc-500 text-sm">
                    {payment?.guests} guest
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Total amount paid</span>
                  <span className="font-semibold">${payment?.totalCosts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 text-sm">Booking ID</span>
                  <span>{payment?._id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Next Steps</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-primary">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Check your email</h4>
                <p className="text-zinc-600">
                  We&apos;ve sent your confirmation and trip details to your
                  email address.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-primary">
                <FaCommentAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Message your host</h4>
                <p className="text-zinc-600">
                  Introduce yourself and let them know your travel plans.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-primary">
                <FaSuitcase className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Plan your trip</h4>
                <p className="text-zinc-600">
                  Review house rules and check-in instructions in your trip
                  details.
                </p>
              </div>
            </div>
          </div>
        </div>

        <PaymentDetailsDownload payment={payment} />

        <div className="mt-12 text-center">
          <p className="text-zinc-600">Need help with your booking?</p>
          <Link href="/help" className="text-primary hover:underline">
            Visit our Help Center
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentStatus;
