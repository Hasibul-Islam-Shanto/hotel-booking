import PaymentCheckoutDetails from "@/components/payment/PaymentCheckoutDetails";
import PaymentForm from "@/components/payment/PaymentForm";
import { fetchPayment } from "@/lib/api/fetch-api";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

const PaymentDetails = async ({ params }: { params: { id: string } }) => {
  const response = await fetchPayment(params.id);
  const payment = response.payment;
  console.log(payment);
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-zinc-800 hover:underline"
          >
            <FaChevronLeft />
            Request to book
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <PaymentForm />
          <PaymentCheckoutDetails />
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
