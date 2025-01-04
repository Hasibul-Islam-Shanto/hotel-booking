"use server";

import { signIn } from "@/auth";
import { checkAuthError } from "@/utils/checkAuthError";

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
