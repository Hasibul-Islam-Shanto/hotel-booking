import { Payment } from "@/types/payment";
import jsPDF from "jspdf";
import { formattedDate } from "./helper";

export const receiptTemplate = (payment: Payment, isDownload?: boolean) => {
  const doc = new jsPDF();
  const marginLeft = 20;
  let yPos = 20;
  doc.addImage("/logo.svg", "JPEG", 15, 2, 180, 100);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("PAYMENT RECEIPT", 105, yPos + 10, { align: "center" });

  yPos += 30;
  doc.setFontSize(12);
  doc.text(`Receipt #: ${payment?._id}`, marginLeft, yPos);
  doc.text("Date: " + new Date().toLocaleDateString(), 140, yPos);

  yPos += 10;
  doc.line(marginLeft, yPos, 190, yPos);

  yPos += 20;
  doc.text("Guest Information", marginLeft, yPos);
  yPos += 10;
  doc.setFont("helvetica", "normal");
  doc.text(
    [
      `Name: ${payment?.user?.name}`,
      `Email: ${payment?.user?.email}`,
      `Location: ${payment?.city}, ${payment?.zipCode}`,
      `Address: ${payment?.address}`,
      `Card Number: ${payment?.cardNumber}`,
    ],
    marginLeft,
    yPos
  );
  yPos = 80;
  doc.setFont("helvetica", "bold");
  doc.text("Booking Details", 120, yPos);
  yPos += 10;
  doc.setFont("helvetica", "normal");
  doc.text(
    [
      `Check-in: ${formattedDate(payment?.checkInDate)}`,
      `Check-out: ${formattedDate(payment?.checkoutDate)}`,
      `Total Cost: $${payment?.totalCosts}`,
      `Guests: ${payment?.guests}`,
    ],
    120,
    yPos
  );
  if (isDownload) {
    doc.save("payment-receipt.pdf");
  }
  const pdfBase64 = doc.output("datauristring").split(",")[1];
  return pdfBase64;
};
