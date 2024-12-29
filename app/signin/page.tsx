import Link from "next/link";
import {MdHome} from "react-icons/md";
import LoginForm from "@/components/auth/LoginForm";

const Signin = () => {

    return (
        <div className="w-full h-screen flex items-center justify-center relative">
            <div className="absolute top-0 left-0 p-5 text-primary flex items-center gap-x-3">
                <Link href="/" className="flex items-center gap-x-1">
                    <MdHome className="text-xl"/>
                    Home
                </Link>
                <span> | </span>
                <p>Sign in</p>
            </div>
            <div className="bg-white rounded-xl shadow-md border-[1px] border-gray-200 w-96 p-6 relative ">
                <LoginForm/>
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
