"use client";

import { deleteReview } from "@/lib/api/post-api";
import { FaTrash } from "react-icons/fa6";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import useCustomToast from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";

const ReviewDeleteButton = ({ id }: { id: string | undefined }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toastSuccess, toastError } = useCustomToast();
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteReview(id);
      toastSuccess("Review deleted successfully");
      setLoading(false);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message);
      } else {
        toastError("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button onClick={handleDelete} className="flex items-center gap-2">
        {loading ? (
          <Spinner className="w-6 h-6 border-t-primary" />
        ) : (
          <FaTrash className="text-red-400 text-md" />
        )}
      </button>
    </>
  );
};

export default ReviewDeleteButton;
