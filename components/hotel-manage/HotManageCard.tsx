import Image from "next/image";
import { FaEdit, FaStar, FaTrash } from "react-icons/fa";

const HotManageCard = () => {
  return (
    <>
      <div className="overflow-hidden cursor-pointer">
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height={500}
            width={500}
            alt="Hotel Property"
            className="w-full h-48 object-cover rounded-md transition-all hover:scale-105"
          />
          <div className="absolute flex items-center gap-1 top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-semibold">
            <FaStar className="text-yellow-500" />
            4.9
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-zinc-800 mb-2">
            Cozy Mountain Retreat
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-zinc-600">3 Rooms Available</span>
            <span className="text-rose-600 font-semibold">$250/night</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Location: Mountain View, CA</span>
            <div className="space-x-2">
              <button className="text-blue-500 hover:text-blue-600">
                <FaEdit />
              </button>
              <button className="text-red-500 hover:text-red-600">
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotManageCard;
