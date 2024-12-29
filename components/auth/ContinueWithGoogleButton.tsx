"use client";
import Image from "next/image";
import {signIn, useSession} from "next-auth/react";


const ContinueWithGoogleButton = () => {
    const session = useSession();
    console.log(session);
    return (
        <>
            <button
                onClick={() => signIn("google")}
                className="w-full flex items-center justify-center gap-x-2 border border-gray-300 rounded-full py-3 hover:bg-gray-50 transition">
                <Image
                    src={"/google.svg"}
                    height={20}
                    width={20}
                    alt="google-image"
                />
                Continue with Google
            </button>
        </>
    )
}
export default ContinueWithGoogleButton
