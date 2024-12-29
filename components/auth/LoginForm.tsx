"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {login} from "@/app/actions";
import React, {useState} from "react";
import Spinner from "@/components/ui/Spinner";


const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const handleSignin = async () => {
        await signIn("google", {callbackUrl: "/"});
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData(event.target as HTMLFormElement);
            const res = await login(formData);
            if (!!res.error) {
                setError(res.message);
                setLoading(false)
            } else {
                router.push("/");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                setLoading(false)
            } else {
                setError("Something went wrong!");
                setLoading(false)
            }
        }

    }
    return (
        <>
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
                <button
                    onClick={handleSignin}
                    className="w-full flex items-center justify-center gap-x-2 border border-gray-300 rounded-full py-3 hover:bg-gray-50 transition">
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
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="w-full flex justify-center items-center">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-full py-3 hover:bg-primary transition"
                    >
                        {loading && <Spinner className={"h-6 w-6"}/>}
                        Continue
                    </button>
                </form>
            </div>
        </>
    )
}
export default LoginForm
