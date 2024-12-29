import Modal from "@/components/ui/Modal";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

const SignupInterception = () => {
    return (
        <Modal>
            <div className="w-full  flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-md border-[1px] border-gray-200 w-96 p-6 relative ">
                    <RegisterForm/>
                    <div className="text-center text-sm text-gray-600">
                        <p>
                            Already have an account?
                            <Link
                                href="/signin"
                                className="text-primary hover:underline mx-2"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SignupInterception;
