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
