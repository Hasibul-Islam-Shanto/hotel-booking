"use client";

import { Payment } from "@/types/payment";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import { formattedDate } from "@/utils/helper";

const PaymentDetailsDownload = ({ payment }: { payment: Payment }) => {
  const doc = new jsPDF();

  const generatePDF = () => {
    doc.setFontSize(16);
    doc.text("Payment Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${payment?.hotel?.propertyName}`, 20, 40);
    doc.text(`Location: ${payment?.hotel?.propertyLocation}`, 20, 50);
    doc.text(`Check-in Date: ${formattedDate(payment?.checkInDate)}`, 20, 60);
    doc.text(`Checkout Date: ${formattedDate(payment.checkoutDate)}`, 20, 70);
    doc.text(`Guests: ${payment.guests}`, 20, 80);
    doc.text(`Card Number: ${payment.cardNumber}`, 20, 90);
    doc.text(`Total Costs: $${payment.totalCosts}`, 20, 100);
    doc.text(`Status: ${payment.status}`, 20, 110);
    doc.save("payment-receipt.pdf");
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={generatePDF}
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
