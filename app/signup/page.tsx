import Link from "next/link";
import {MdHome} from "react-icons/md";
import RegisterForm from "@/components/auth/RegisterForm";

const Signup = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center relative">
            <div className="absolute top-0 left-0 p-5 text-primary flex items-center gap-x-3">
                <Link href="/" className="flex items-center gap-x-1">
                    <MdHome className="text-xl"/>
                    Home
                </Link>
                <span> | </span>
                <p>Sign up</p>
            </div>
            <div className="bg-white rounded-xl shadow-md border-[1px] border-gray-200 w-96 p-6 relative ">
                <RegisterForm/>
                <div className="text-center text-sm text-gray-600">
                    <p>
                        Already have an account?
                        <Link href="/signin" className="text-primary hover:underline mx-2">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
