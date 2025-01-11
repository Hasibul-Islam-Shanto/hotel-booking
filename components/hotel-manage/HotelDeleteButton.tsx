"use client";

import useCustomToast from "@/hooks/useCustomToast";
import { deleteHotel } from "@/lib/api/post-api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import Spinner from "../ui/Spinner";

const HotelDeleteButton = ({ id }: { id: string | undefined }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toastError, toastSuccess } = useCustomToast();
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteHotel(id);
      toastSuccess("Hotel deleted successfully");
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
    <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
      {loading ? <Spinner className="w-6 h-6 border-t-primary" /> : <FaTrash />}
    </button>
  );
};

export default HotelDeleteButton;
