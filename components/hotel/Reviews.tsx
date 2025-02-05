import { auth } from "@/auth";
import { formattedDate } from "@/utils/helper";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import ReviewDeleteButton from "./ReviewDeleteButton";
import Review from "@/types/reviews";

const Reviews = async ({ reviews }: { reviews: Review[] }) => {
  const session = await auth();

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        {reviews?.map((review) => (
          <div key={review._id} className="space-y-4">
            <div className="flex justify-start gap-x-8 items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  {review?.user?.image ? (
                    <Image
                      src={review?.user?.image}
                      height={48}
                      width={48}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full font-bold text-2xl text-white flex items-center justify-center bg-teal-500">
                      {review?.user?.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{review?.user?.name}</h4>
                  <p className="text-gray-500 text-sm">
                    {formattedDate(review?.createdAt)}
                  </p>
                </div>
              </div>
              {session?.user?.email === review?.user?.email && (
                <ReviewDeleteButton id={review._id} />
              )}
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < review?.rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed">
              {review?.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Reviews;
