"use client";

import { deleteReview } from "@/lib/api/post-api";
import { FaTrash } from "react-icons/fa6";

const ReviewDeleteButton = ({ id }: { id: string | undefined }) => {
  const handleDelete = async () => {
    await deleteReview(id);
  };
  return (
    <>
      <button onClick={handleDelete}>
        <FaTrash className="text-red-400 text-md" />
      </button>
    </>
  );
};

export default ReviewDeleteButton;
