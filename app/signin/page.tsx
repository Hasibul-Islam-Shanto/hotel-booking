import Image from "next/image";
import Link from "next/link";
import { MdHome } from "react-icons/md";

const Signin = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="absolute top-0 left-0 p-5 text-primary flex items-center gap-x-3">
        <Link href="/" className="flex items-center gap-x-1">
          <MdHome className="text-xl" />
          Home
        </Link>
        <span> | </span>
        <p>Sign in</p>
      </div>
      <div className="bg-white rounded-xl shadow-md border-[1px] border-gray-200 w-96 p-6 relative ">
        <button
          id="closeModalBtn"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <i className="ph-x text-2xl"></i>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Log in to Hotel Booking
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Welcome back! Let&apos;s get you signed in.
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

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white rounded-full py-3 hover:bg-primary transition"
            >
              Continue
            </button>
          </form>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don&apos;t have an account?
            <Link href="/signup" className="text-primary hover:underline mx-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
