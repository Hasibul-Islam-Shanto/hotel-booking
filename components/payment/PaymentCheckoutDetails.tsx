import { Payment } from "@/types/payment";
import { calculateDays } from "@/utils/helper";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
// import { FaStar } from "react-icons/fa6";

const PaymentCheckoutDetails = ({ payment }: { payment: Payment }) => {
  const { watch } = useFormContext();
  const data = watch();
  const days = calculateDays(data.checkInDate, data.checkoutDate);
  const guests = data.guests;
  const roomCount = guests > 2 ? Math.ceil(guests / 2) : 1;
  const costForDays =
    typeof payment.hotel === "object"
      ? payment.hotel.pricePerNight * days * roomCount
      : 0;
  const totalCost = costForDays + 15.5 + 40.5;
  return (
    <>
      <div>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 sticky top-0">
          <div className="flex items-start gap-4 mb-6">
            {typeof payment?.hotel === "object" && (
              <Image
                src={payment.hotel.images[0]}
                height={50}
                width={50}
                alt="Property"
                className="w-20 h-20 rounded-lg object-cover"
              />
            )}
            <div>
              <p className="text-sm">
                {typeof payment?.hotel === "object" &&
                  payment?.hotel?.propertyName}
              </p>
              {/* todo = calculate the rating then use it here */}
              {/* <div className="flex items-center">
                <FaStar />
                <span className="text-xs mt-1 text-zinc-500">
                  5.00 (3 Reviews)
                </span>
              </div> */}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Price details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>
                  $
                  {typeof payment?.hotel === "object" &&
                    `${payment.hotel.pricePerNight} x ${days} nights x ${roomCount} Rooms`}
                </span>
                <span>${costForDays}</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>$15.50</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>$40.50</span>
              </div>
              <div className="flex justify-between font-semibold pt-3 border-t">
                <span>Total (USD)</span>
                <span>${totalCost}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCheckoutDetails;
