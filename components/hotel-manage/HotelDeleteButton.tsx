"use client";

import { deleteHotel } from "@/lib/api/post-api";
import { FaTrash } from "react-icons/fa6";

const HotelDeleteButton = ({ id }: { id: string | undefined }) => {
  const handleDelete = async () => {
    await deleteHotel(id);
  };
  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
      <FaTrash />
    </button>
  );
};

export default HotelDeleteButton;
