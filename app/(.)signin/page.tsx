import Modal from "@/components/ui/Modal";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

const SigninInterception = () => {
    return (
        <Modal>
            <div className="bg-white rounded-xl shadow-2xl w-96 p-6 relative ">
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
        </Modal>
    );
};

export default SigninInterception;
