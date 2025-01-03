import { Payment } from "@/types/payment";
import { generatePdfBase64 } from "@/utils/receipt-download";
import { Resend } from "resend";

export async function sendEmail(payment: Payment, email: string) {
  const pdfBase64 = generatePdfBase64(payment);
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
  console.log("Sending email to", email);
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Payment Receipt",
      text: "Please find the attached payment receipt",
      attachments: [
        {
          filename: "payment-receipt.pdf",
          content: pdfBase64,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send email"
    );
  }
}
