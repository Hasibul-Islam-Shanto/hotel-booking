import Image from "next/image";
import {FaStar} from "react-icons/fa";

const Reviews = () => {
    return (
        <>
            <div className="grid grid-cols-2 gap-8">
                {/* <!-- Review Card 1 --> */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                            <Image
                                src="https://avatar.iran.liara.run/public"
                                height={48}
                                width={48}
                                alt="User avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="font-medium">John Smith</h4>
                            <p className="text-gray-500 text-sm">December 2024</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FaStar className="text-yellow-500"/>
                        <FaStar className="text-yellow-500"/>
                        <FaStar className="text-yellow-500"/>
                        <FaStar className="text-yellow-500"/>
                        <FaStar className="text-yellow-500"/>

                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        Amazing stay! The villa exceeded our expectations. The private pool
                        and beach access were highlights of our trip. Sarah was an excellent
                        host, always responsive and helpful.
                    </p>
                </div>

                {/* <!-- Review Card 2 --> */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                            <Image
                                src="https://avatar.iran.liara.run/public"
                                height={48}
                                width={48}
                                alt="User avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="font-medium">Emma Wilson</h4>
                            <p className="text-gray-500 text-sm">November 2024</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FaStar className="text-yellow-500"/>
                        <FaStar className="text-yellow-500"/>
                        <FaStar className="text-yellow-500"/>
                        <FaStar className="text-yellow-500"/>
                        <FaStar className="text-yellow-500"/>

                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        Perfect location for a family vacation. The villa was spotlessly
                        clean and well-maintained. The kitchen was fully equipped, and we
                        loved cooking meals while enjoying the ocean view.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Reviews;
