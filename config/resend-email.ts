import { Payment } from "@/types/payment";
import { generatePdfBase64 } from "@/utils/receipt-download";
// import { Resend } from "resend";
import transporter from "./nodemailer";
export async function sendEmail(payment: Payment, email: string | undefined) {
  const pdfBase64 = generatePdfBase64(payment);
  // const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

  try {
    const info = await transporter.sendMail({
      from: "mdhasibulislam895@gmail.com",
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
    console.log(info);
    // await resend.emails.send({
    //   from: "Acme <onboarding@resend.dev>",
    //   to: email as string,
    //   subject: "Payment Receipt",
    //   text: "Please find the attached payment receipt",
    //   attachments: [
    //     {
    //       filename: "payment-receipt.pdf",
    //       content: pdfBase64,
    //     },
    //   ],
    // });
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send email"
    );
  }
}
