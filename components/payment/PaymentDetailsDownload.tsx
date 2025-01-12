"use client";
import { Payment } from "@/types/payment";
import { FaDownload } from "react-icons/fa6";
import { receiptTemplate } from "@/utils/receiptTemplate";

const PaymentDetailsDownload = ({ payment }: { payment: Payment }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => receiptTemplate(payment, true)}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:brightness-90 flex items-center gap-2"
        >
          <FaDownload />
          Download Receipt
        </button>
      </div>
    </>
  );
};

export default PaymentDetailsDownload;
