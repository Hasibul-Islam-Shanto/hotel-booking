"use client";

import { SetStateAction, useState } from "react";
import Modal from "../ui/Modal";
import { FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import Hotel from "@/types/hotel";
import { postReview } from "@/lib/api/post-api";
import Spinner from "../ui/Spinner";

const ReviewButton = ({ hotel }: { hotel: Hotel }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState<string>("");
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleRating = (ratingValue: SetStateAction<number>) => {
    setRating(ratingValue);
  };

  const handleSubmitReview = async () => {
    setLoading(true);
    const submitData = {
      rating,
      description,
      hotelId: hotel?._id,
    };
    const response = await postReview(submitData);
    setLoading(false);
    if (response.status === 200) {
      setIsReviewModalOpen(false);
      setRating(0);
      setDescription("");
    } else {
      setError(response.message);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsReviewModalOpen(true)}
        className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100"
      >
        Write a Review
      </button>
      {isReviewModalOpen && (
        <Modal>
          <div className="bg-white rounded-2xl w-full max-w-xl mx-4 overflow-hidden">
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Write a review</h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsReviewModalOpen(false);
                    setRating(0);
                    setDescription("");
                  }}
                  className="text-black hover:text-gray-600"
                >
                  <FiX />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Overall Rating
                  </label>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }, (_, index) => {
                      const starValue = index + 1;
                      return (
                        <FaStar
                          key={starValue}
                          size={30}
                          color={
                            starValue <= (hover || rating) ? "gold" : "gray"
                          }
                          onMouseEnter={() => setHover(starValue)}
                          onMouseLeave={() => setHover(0)}
                          onClick={() => handleRating(starValue)}
                          style={{ cursor: "pointer" }}
                        />
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share your experience with other travelers..."
                    className="w-full px-4 py-3 rounded-lg border focus:border-gray-500 focus:ring-0 resize-none"
                  ></textarea>
                </div>
              </form>
            </div>
            {error && (
              <div className="w-full flex justify-center items-center text-red-400 p-2">
                {error}
              </div>
            )}
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsReviewModalOpen(false);
                    setRating(0);
                    setDescription("");
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={!rating || !description}
                  className="px-4 py-2 flex items-center justify-center gap-2 bg-primary text-white rounded-lg hover:brightness-90"
                >
                  {loading && <Spinner className="h-6 w-6 border-t-white" />}
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ReviewButton;
