import { updatePayment } from "@/lib/api/post-api";
import { PaymentSchema } from "@/schemas/payment";
import { Payment } from "@/types/payment";
import { calculateDays, formattedDate } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Spinner from "../ui/Spinner";

const PaymentForm = ({ payment }: { payment: Payment }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<PaymentSchema>();
  const data = watch();
  console.log(payment._id);

  const days = calculateDays(data.checkInDate, data.checkoutDate);
  const guests = data.guests;
  const roomCount = guests > 4 ? guests / 2 : 1;
  const costForDays =
    typeof payment.hotel === "object"
      ? payment.hotel.pricePerNight * days * roomCount
      : 0;
  const totalCost = costForDays + 15.5 + 40.5;

  const onSubmit = async (data: PaymentSchema) => {
    setLoading(true);
    const formatedData = {
      checkInDate: data.checkInDate,
      checkoutDate: data.checkoutDate,
      guests: data.guests,
      totalCosts: totalCost,
      cardNumber: data.cardNumber,
      user: payment.user,
      hotel:
        typeof payment.hotel === "string" ? payment.hotel : payment.hotel?._id,
      status: "completed",
    };

    const response = await updatePayment(payment._id, formatedData);
    setLoading(false);
    if (response.status === 200) {
      router.push(`/hotels/payment/${response?.updatePayment?._id}/success`);
    }
  };

  console.log(errors);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(errors).length > 0 && (
          <div className="w-full flex justify-center items-center bg-red-400 p-1 rounded-md">
            <p className="text-white text-sm">Please fill all the fields!</p>
          </div>
        )}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your trip</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-medium">Dates</h3>
              <p className="text-zinc-600 text-sm">
                {formattedDate(data?.checkInDate) +
                  " - " +
                  formattedDate(data?.checkoutDate)}
              </p>
            </div>
            <button className="text-zinc-800 underline text-sm">Edit</button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Guests</h3>
              <p className="text-zinc-600 text-sm">{data?.guests} guest</p>
            </div>
            <button className="text-zinc-800 underline text-sm">Edit</button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Pay with American Express
          </h2>
          <div className="space-y-4">
            <input
              {...register("cardNumber")}
              type="text"
              placeholder="Card number"
              className="w-full p-3 border rounded-lg"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("expiration")}
                type="text"
                placeholder="Expiration"
                className="p-3 border rounded-lg"
              />
              <input
                {...register("cvv")}
                type="text"
                placeholder="CVV"
                className="p-3 border rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Billing address</h2>
          <div className="space-y-4">
            <input
              {...register("streetAddress")}
              type="text"
              placeholder="Street address"
              className="w-full p-3 border rounded-lg"
            />
            <input
              {...register("apt")}
              type="text"
              placeholder="Apt or suite number"
              className="w-full p-3 border rounded-lg"
            />
            <input
              {...register("city")}
              type="text"
              placeholder="City"
              className="w-full p-3 border rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("state")}
                type="text"
                placeholder="State"
                className="p-3 border rounded-lg"
              />
              <input
                {...register("zipCode")}
                type="text"
                placeholder="ZIP code"
                className="p-3 border rounded-lg"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 text-center bg-primary text-white py-3 rounded-lg mt-6 hover:brightness-90"
        >
          {loading && <Spinner className="h-6 w-6 border-t-white" />}
          Request to book
        </button>
      </form>
    </>
  );
};

export default PaymentForm;
