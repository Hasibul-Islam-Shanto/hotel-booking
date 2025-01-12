"use server";

import { signIn } from "@/auth";
import transporter from "@/config/nodemailer";
import { Payment } from "@/types/payment";
import { checkAuthError } from "@/utils/checkAuthError";
import { receiptTemplate } from "@/utils/receiptTemplate";
import { EmailReceiptTemplate } from "@/utils/template";

export async function doSignin() {
  await signIn("google", { callbackUrl: "/" });
}

export async function login(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    return checkAuthError(error);
  }
}

export async function deleteHotel(id: string | undefined) {
  const response = await fetch(`/api/hotels/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
}

export async function sendEmail(payment: Payment) {
  const pdfBase64 = receiptTemplate(payment);
  try {
    await transporter.sendMail({
      from: "mdhasibulislam895@gmail.com",
      to: payment?.user?.email,
      subject: "Payment Receipt",
      html: EmailReceiptTemplate(payment),
      text: "Thank you for your payment! This receipt confirms your successful transaction. It includes your check-in and check-out dates, the total amount paid, and the last four digits of your card. Please keep this for your records. We look forward to welcoming you!",
      attachments: [
        {
          filename: "payment-receipt.pdf",
          content: pdfBase64,
          encoding: "base64",
        },
      ],
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to send email"
    );
  }
}
