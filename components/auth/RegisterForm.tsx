"use client";
import Image from "next/image";
import { MdOutlineClear } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (res.status === 500) {
        setError(res.message);
      }
      if (res.status === 201) {
        router.push("/signin");
      }
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setLoading(false);
      } else {
        setError("Something went wrong!");
        setLoading(false);
      }
    }
  };
  return (
    <>
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        <MdOutlineClear className="text-2xl" />
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Register to Hotel Booking
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Welcome back! Let&apos;s get you signed up.
        </p>
      </div>
      <div className="space-y-4 mb-4">
        <button className="w-full flex items-center justify-center gap-x-2 border border-gray-300 rounded-full py-3 hover:bg-gray-50 transition">
          <Image
            src={"/google.svg"}
            height={20}
            width={20}
            alt="google-image"
          />
          Continue with Google
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            name={"name"}
            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Email"
            name={"email"}
            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            name={"password"}
            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="w-full flex justify-center">
            {error && <p className="text-red-500 text-md">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-full py-3 hover:bg-primary transition"
          >
            {loading && <Spinner className="h-6 w-6" />}
            Continue
          </button>
        </form>
      </div>
    </>
  );
};
export default RegisterForm;
