import { Payment } from "@/types/payment";
import jsPDF from "jspdf";
import { formattedDate } from "./helper";
export const generatePDF = (payment: Payment) => {
  const doc = new jsPDF();
  doc.addImage(`${payment?.hotel?.images[0]}`, "JPEG", 15, 2, 180, 100);
  doc.setFontSize(12);
  doc.text(`Name: ${payment?.hotel?.propertyName}`, 20, 110);
  doc.text(`Location: ${payment?.hotel?.propertyLocation}`, 20, 120);
  doc.text(`Check-in Date: ${formattedDate(payment?.checkInDate)}`, 20, 130);
  doc.text(`Checkout Date: ${formattedDate(payment.checkoutDate)}`, 20, 140);
  doc.text(`User name: ${payment?.user?.name}`, 20, 150);
  doc.text(`Email: ${payment?.user?.email}`, 20, 160);
  doc.text(`Guests: ${payment.guests}`, 20, 170);
  doc.text(`Card Number: ${payment.cardNumber}`, 20, 180);
  doc.text(`Total Costs: $${payment.totalCosts}`, 20, 190);
  doc.text(`Status: ${payment.status}`, 20, 200);
  doc.save("payment-receipt.pdf");
};

export const generatePdfBase64 = (payment: Payment) => {
  const doc = new jsPDF();
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
  const pdfBase64 = doc.output("datauristring");
  return pdfBase64;
};
