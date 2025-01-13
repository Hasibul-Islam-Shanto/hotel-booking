import Hotel from "@/types/hotel";
import ReviewButton from "./ReviewButton";
import Reviews from "./Reviews";
import { fetchReviews } from "@/lib/api/fetch-api";
import { FaStar } from "react-icons/fa6";
import ShowError from "../ui/ShowError";
import { auth } from "@/auth";

const ReviewContainer = async ({ hotel }: { hotel: Hotel }) => {
  try {
    const response = await fetchReviews(hotel._id);
    const reviews = response.reviews;
    const session = await auth();
    const isOwnerOfHotel = session?.user?.email === hotel?.user?.email;
    const isAlreadyReviewed = reviews?.some(
      (review) => review.user?.email === session?.user?.email
    );
    const sumRating =
      reviews?.length > 0 &&
      reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = sumRating ? sumRating / reviews.length : 0;
    return (
      <>
        <div className="max-w-7xl mx-auto px-6 py-12 border-t">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">Reviews</h2>
              <div className="flex items-center">
                {averageRating > 0 && (
                  <>
                    <FaStar className="text-yellow-400 text-xl" />
                    <span className="text-xl font-semibold">
                      {averageRating}
                    </span>
                  </>
                )}

                <span className="mx-2">·</span>
                <span className="text-gray-600">{reviews?.length} reviews</span>
              </div>
            </div>
            {!isOwnerOfHotel && !isAlreadyReviewed && (
              <ReviewButton hotel={hotel} />
            )}
          </div>

          <Reviews reviews={reviews} />
        </div>
      </>
    );
  } catch (error) {
    return <ShowError error={error as Error} />;
  }
};

export default ReviewContainer;
