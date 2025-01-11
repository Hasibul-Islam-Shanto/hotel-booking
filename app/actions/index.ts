"use server";

import { signIn } from "@/auth";
import transporter from "@/config/nodemailer";
import { Payment } from "@/types/payment";
import { checkAuthError } from "@/utils/checkAuthError";
import { generatePdfBase64 } from "@/utils/receipt-download";

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

export async function sendEmail(payment: Payment, email: string | undefined) {
  const pdfBase64 = generatePdfBase64(payment);
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
          encoding: "base64",
        },
      ],
    });
    console.log(info);
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send email"
    );
  }
}
